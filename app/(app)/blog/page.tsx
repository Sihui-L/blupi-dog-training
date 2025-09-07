import React from "react";
import { Container, Text } from "@mantine/core";
import PageHeader from "../components/common/PageHeader";
import { getPayload } from "payload";
import config from "@payload-config";
import BlogClient from "./BlogClient";

import { Post } from "../../../payload-types";

// Extended interface for our blog post with proper types
interface BlogPost extends Omit<Post, "id"> {
  id: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const payload = await getPayload({
      config,
    });

    const posts = await payload.find({
      collection: "posts",
      where: {
        status: {
          equals: "published",
        },
      },
      limit: 20,
      sort: "-publishedAt",
      depth: 2, // This will populate the featuredImage relation
    });

    return posts.docs.map((post: any) => ({
      ...post,
      id: String(post.id),
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHeader
        title="Blog"
        subtitle="Expert tips, guides, and insights on dog training and pet behaviour."
      />

      <Container size="lg" pb={80}>
        {posts.length === 0 ? (
          <Text ta="center" size="lg" c="gray.7" mt="xl">
            No blog posts available yet. Check back soon for training tips and
            insights!
          </Text>
        ) : (
          <BlogClient posts={posts} />
        )}
      </Container>
    </>
  );
}
