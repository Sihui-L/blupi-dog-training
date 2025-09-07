import React from "react";
import { Container, Text, Box, Badge, Group, Stack, Image } from "@mantine/core";
import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { TEMPLATE_IMAGES } from "../../constants/images";
import { Post, Media } from "../../../../payload-types";

// Extended interface for our blog post with proper types
interface BlogPost extends Omit<Post, 'id'> {
  id: string;
}

async function fetchBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const payload = await getPayload({
      config,
    });

    const post = await payload.findByID({
      collection: "posts",
      id,
      depth: 2, // This will populate the featuredImage relation
    });

    // Check if post exists and is published
    if (!post || post.status !== 'published') {
      return null;
    }

    return {
      ...post,
      id: String(post.id),
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// Renders Slate rich text content into React components
function renderSlateContent(content: any): React.ReactNode {
  if (!content || !Array.isArray(content)) {
    return <Text size="md" c="gray.6">No content available</Text>;
  }

  const renderTextNodes = (children: any[]): React.ReactNode => {
    if (!children || !Array.isArray(children)) return null;
    
    return children.map((child: any, childIndex: number) => {
      if (typeof child === 'string') return child;
      
      if (child.text !== undefined) {
        let text = child.text;
        
        if (child.bold) {
          text = <strong key={childIndex}>{text}</strong>;
        }
        if (child.italic) {
          text = <em key={childIndex}>{text}</em>;
        }
        if (child.underline) {
          text = <u key={childIndex}>{text}</u>;
        }
        if (child.code) {
          text = <code key={childIndex} style={{ backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '3px' }}>{text}</code>;
        }
        
        return text;
      }
      
      // Handle nodes with children property
      if (child.children && Array.isArray(child.children)) {
        return renderTextNodes(child.children);
      }
      
      // For any other node types, just return null to avoid infinite recursion
      return null;
    });
  };

  return content.map((node: any, index: number) => {
    // Handle paragraph nodes
    if (node.type === 'paragraph' || !node.type) {
      const hasContent = node.children && node.children.some((child: any) => 
        child.text && child.text.trim().length > 0
      );
      
      if (!hasContent) {
        return <Box key={index} style={{ marginBottom: '16px' }} />; // Empty paragraph spacing
      }
      
      return (
        <Text key={index} size="md" style={{ 
          lineHeight: 1.7, 
          marginBottom: '20px',
          color: '#333'
        }}>
          {renderTextNodes(node.children)}
        </Text>
      );
    }
    
    // Handle heading nodes
    if (node.type === 'heading') {
      const level = node.level || 2;
      const sizes = { 1: 'xl', 2: 'lg', 3: 'md', 4: 'md', 5: 'sm', 6: 'sm' };
      const weights = { 1: 700, 2: 700, 3: 600, 4: 600, 5: 500, 6: 500 };
      const margins = { 1: '32px', 2: '28px', 3: '24px', 4: '20px', 5: '16px', 6: '16px' };
      
      return (
        <Text 
          key={index} 
          size={sizes[level as keyof typeof sizes] || 'md'} 
          fw={weights[level as keyof typeof weights] || 600}
          style={{ 
            marginTop: level <= 2 ? margins[level as keyof typeof margins] : '20px',
            marginBottom: '16px',
            lineHeight: 1.3,
            color: '#222'
          }}
        >
          {renderTextNodes(node.children)}
        </Text>
      );
    }
    
    // Handle list nodes
    if (node.type === 'ul') {
      return (
        <Box key={index} component="ul" style={{ 
          marginBottom: '20px', 
          paddingLeft: '20px',
          lineHeight: 1.7 
        }}>
          {node.children?.map((listItem: any, itemIndex: number) => (
            <Box key={itemIndex} component="li" style={{ marginBottom: '8px' }}>
              <Text size="md" style={{ color: '#333' }}>
                {renderTextNodes(listItem.children)}
              </Text>
            </Box>
          ))}
        </Box>
      );
    }
    
    if (node.type === 'ol') {
      return (
        <Box key={index} component="ol" style={{ 
          marginBottom: '20px', 
          paddingLeft: '20px',
          lineHeight: 1.7 
        }}>
          {node.children?.map((listItem: any, itemIndex: number) => (
            <Box key={itemIndex} component="li" style={{ marginBottom: '8px' }}>
              <Text size="md" style={{ color: '#333' }}>
                {renderTextNodes(listItem.children)}
              </Text>
            </Box>
          ))}
        </Box>
      );
    }
    
    // Handle quote/blockquote
    if (node.type === 'blockquote') {
      return (
        <Box key={index} style={{ 
          borderLeft: '4px solid #e9ecef',
          paddingLeft: '16px',
          marginBottom: '20px',
          fontStyle: 'italic'
        }}>
          <Text size="md" c="gray.7" style={{ lineHeight: 1.7 }}>
            {renderTextNodes(node.children)}
          </Text>
        </Box>
      );
    }

    // Fallback for unknown node types - render as paragraph
    return (
      <Text key={index} size="md" style={{ 
        lineHeight: 1.7, 
        marginBottom: '20px',
        color: '#333'
      }}>
        {node.children ? renderTextNodes(node.children) : (typeof node === 'string' ? node : '')}
      </Text>
    );
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await fetchBlogPostById(id);

  if (!post) {
    notFound();
  }

  const formatPublishDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container size="md" py={40}>
      <Stack gap="xl">
        {/* Back to Blog Link */}
        <Link href="/blog" style={{ textDecoration: 'none' }}>
          <Group gap="xs" style={{ cursor: 'pointer' }} className="hover:text-green-800 transition-colors">
            <IconArrowLeft size={16} />
            <Text size="sm" c="gray.6">Back to Blog</Text>
          </Group>
        </Link>

        {/* Article Header */}
        <Stack gap="md">
          <Text 
            size="2xl" 
            fw={700} 
            c="gray.9" 
            style={{ 
              lineHeight: 1.2, 
              fontSize: '2.5rem',
              marginBottom: '8px'
            }}
          >
            {post.title}
          </Text>
          
          <Group gap="md" align="center">
            <Text size="sm" c="gray.5">
              {post.publishedAt ? formatPublishDate(post.publishedAt) : formatPublishDate(post.createdAt)}
            </Text>
            
            {post.tags && post.tags.length > 0 && (
              <>
                <Text size="sm" c="gray.4">·</Text>
                <Group gap="xs">
                  {post.tags.map((tagObj, index) => (
                    tagObj.tag && (
                      <Badge
                        key={index}
                        variant="light"
                        size="sm"
                        className="bg-green-50 text-green-900 border-green-200"
                      >
                        {tagObj.tag}
                      </Badge>
                    )
                  ))}
                </Group>
              </>
            )}
          </Group>
        </Stack>

        {/* Featured Image */}
        <Box>
          <Image
            src={
              (typeof post.featuredImage === 'object' && post.featuredImage?.url) 
                ? post.featuredImage.url 
                : TEMPLATE_IMAGES.fallback
            }
            alt={
              (typeof post.featuredImage === 'object' && post.featuredImage?.alt) 
                ? post.featuredImage.alt 
                : post.title
            }
            radius="md"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
            fallbackSrc={TEMPLATE_IMAGES.fallback}
          />
        </Box>

        {/* Description */}
        <Text size="lg" c="gray.6" style={{ lineHeight: 1.5, fontStyle: 'italic' }}>
          {post.description}
        </Text>

        {/* Article Content */}
        <Box style={{ 
          borderTop: '1px solid #e9ecef', 
          paddingTop: '32px',
          color: '#333',
          fontSize: '16px'
        }}>
          {renderSlateContent(post.content)}
        </Box>

        {/* Back to Blog Footer */}
        <Box style={{ 
          borderTop: '1px solid #e9ecef', 
          paddingTop: '32px',
          textAlign: 'center'
        }}>
          <Link href="/blog" style={{ textDecoration: 'none' }}>
            <Text 
              size="md" 
              c="green.8" 
              fw={500}
              className="hover:text-green-900 transition-colors"
              style={{ cursor: 'pointer' }}
            >
              ← Back to all blog posts
            </Text>
          </Link>
        </Box>
      </Stack>
    </Container>
  );
}