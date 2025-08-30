"use client";

import React, { useState } from "react";
import {
  TextInput,
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Grid,
  GridCol,
  Button,
  Image,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { TEMPLATE_IMAGES } from "../constants/images";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: any;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  tags?: Array<{ tag: string }>;
  featuredImage?: {
    url: string;
    alt: string;
  };
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
        post.tags?.map(tagObj => tagObj.tag) || []
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
            <Button
              variant={selectedTag === null ? "filled" : "outline"}
              size="xs"
              onClick={() => setSelectedTag(null)}
              className={selectedTag === null 
                ? "bg-green-900 text-white hover:bg-green-800" 
                : "border-green-900 text-green-900 hover:bg-green-50"}
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "filled" : "outline"}
                size="xs"
                onClick={() => setSelectedTag(tag)}
                className={selectedTag === tag 
                  ? "bg-green-900 text-white hover:bg-green-800" 
                  : "border-green-900 text-green-900 hover:bg-green-50"}
              >
                {tag}
              </Button>
            ))}
          </Group>
        )}
      </Stack>

      {/* Blog Posts Grid */}
      {filteredPosts.length === 0 ? (
        <Text ta="center" size="lg" c="gray.6" mt="xl">
          No posts found matching your criteria.
        </Text>
      ) : (
        <Grid>
          {filteredPosts.map((post) => (
            <GridCol key={post.id} span={{ base: 12, md: 6, lg: 4 }}>
              <Card shadow="md" radius="md" h="100%" p="lg">
                <Stack gap="md" h="100%">
                  {/* Featured Image */}
                  <Image
                    src={post.featuredImage?.url || TEMPLATE_IMAGES.blog.puppyTraining}
                    alt={post.featuredImage?.alt || post.title}
                    h={200}
                    radius="sm"
                    fallbackSrc={TEMPLATE_IMAGES.fallback}
                  />

                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Text size="lg" fw={600} c="gray.8" lineClamp={2}>
                      {post.title}
                    </Text>

                    <Text size="sm" c="gray.6">
                      {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                    </Text>

                    <Text size="sm" c="gray.7" lineClamp={3}>
                      {post.description}
                    </Text>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <Group gap="xs" mt="xs">
                        {post.tags.slice(0, 3).map((tagObj, index) => (
                          <Badge
                            key={index}
                            variant="light"
                            size="sm"
                            className="bg-green-50 text-green-900 border-green-200"
                          >
                            {tagObj.tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="light" color="gray" size="sm">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </Group>
                    )}
                  </Stack>

                  <Button
                    variant="light"
                    fullWidth
                    className="bg-green-50 text-green-900 hover:bg-green-100"
                    mt="auto"
                  >
                    Read More
                  </Button>
                </Stack>
              </Card>
            </GridCol>
          ))}
        </Grid>
      )}
    </Stack>
  );
}