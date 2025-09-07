"use client";

import React, { useState } from "react";
import {
  TextInput,
  Text,
  Badge,
  Group,
  Stack,
  Image,
  Box,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { TEMPLATE_IMAGES } from "../constants/images";
import Link from "next/link";

import { Post, Media } from "../../../payload-types";

// Extended interface for our blog post with proper types
interface BlogPost extends Omit<Post, 'id'> {
  id: string;
}

interface BlogClientProps {
  posts: BlogPost[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(
    new Set(
      posts.flatMap(post => 
        post.tags?.map(tagObj => tagObj.tag).filter(Boolean) || []
      )
    )
  );

  // Filter posts based on search and tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || 
                      post.tags?.some(tagObj => tagObj.tag === selectedTag);
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Stack gap="xl">
      {/* Search and Filter Section */}
      <Stack gap="md">
        <TextInput
          placeholder="Search blog posts..."
          leftSection={<IconSearch size={16} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          size="md"
        />

        {/* Tag Filter Buttons */}
        {allTags.length > 0 && (
          <Group gap="xs">
            <Badge
              variant={selectedTag === null ? "filled" : "outline"}
              size="lg"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedTag(null)}
              className={selectedTag === null 
                ? "bg-green-900 text-white hover:bg-green-800" 
                : "border-green-900 text-green-900 hover:bg-green-50"}
            >
              All
            </Badge>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "filled" : "outline"}
                size="lg"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedTag(tag || null)}
                className={selectedTag === tag 
                  ? "bg-green-900 text-white hover:bg-green-800" 
                  : "border-green-900 text-green-900 hover:bg-green-50"}
              >
                {tag}
              </Badge>
            ))}
          </Group>
        )}
      </Stack>

      {/* Blog Posts List */}
      {filteredPosts.length === 0 ? (
        <Text ta="center" size="lg" c="gray.6" mt="xl">
          No posts found matching your criteria.
        </Text>
      ) : (
        <Stack gap="xl">
          {filteredPosts.map((post) => (
            <Box
              key={post.id}
              style={{
                borderBottom: '1px solid #e9ecef',
                paddingBottom: '24px',
              }}
            >
              <Group align="flex-start" gap="lg">
                {/* Content Section */}
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Stack gap="sm">
                    {/* Title - Clickable */}
                    <Link href={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                      <Text
                        size="xl"
                        fw={700}
                        c="gray.9"
                        lineClamp={2}
                        style={{
                          cursor: 'pointer',
                          lineHeight: 1.2,
                        }}
                        className="hover:text-green-800 transition-colors"
                      >
                        {post.title}
                      </Text>
                    </Link>

                    {/* Description */}
                    <Text size="md" c="gray.6" lineClamp={3} style={{ lineHeight: 1.4 }}>
                      {post.description}
                    </Text>

                    {/* Meta Info and Tags */}
                    <Group gap="md" align="center">
                      <Text size="sm" c="gray.5">
                        {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                      </Text>
                      
                      {post.tags && post.tags.length > 0 && (
                        <>
                          <Text size="sm" c="gray.4">·</Text>
                          <Group gap="xs">
                            {post.tags.slice(0, 2).map((tagObj, index) => (
                              tagObj.tag && (
                                <Badge
                                  key={index}
                                  variant="light"
                                  size="sm"
                                  className="bg-gray-100 text-gray-600 border-gray-200"
                                >
                                  {tagObj.tag}
                                </Badge>
                              )
                            ))}
                            {post.tags.length > 2 && (
                              <Text size="sm" c="gray.5">
                                +{post.tags.length - 2} more
                              </Text>
                            )}
                          </Group>
                        </>
                      )}
                    </Group>
                  </Stack>
                </Box>

                {/* Featured Image */}
                <Box style={{ flexShrink: 0 }}>
                  <Link href={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
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
                      w={120}
                      h={80}
                      radius="md"
                      style={{ cursor: 'pointer' }}
                      fallbackSrc={TEMPLATE_IMAGES.fallback}
                    />
                  </Link>
                </Box>
              </Group>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
}