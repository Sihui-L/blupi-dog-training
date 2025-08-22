import React, { useState } from "react";
import {
  Container,
  TextInput,
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Grid,
  Button,
  Paper,
  Center,
  Image,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { TEMPLATE_IMAGES } from "../constants/images";
import PageHeader from "../components/common/PageHeader";

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Placeholder blog posts with template images
  const blogPosts = [
    {
      id: "1",
      title: "Getting Started with Puppy Training",
      excerpt: "Essential tips for training your new puppy from day one.",
      author: "Blupi Dog Training",
      publishedAt: "2024-01-15",
      tags: ["puppies", "basic training", "tips"],
      image: TEMPLATE_IMAGES.blog.puppyTraining,
    },
    {
      id: "2",
      title: "Understanding Dog Body Language",
      excerpt: "Learn to read your dog's signals and improve communication.",
      author: "Blupi Dog Training",
      publishedAt: "2024-01-10",
      tags: ["behavior", "communication", "understanding"],
      image: TEMPLATE_IMAGES.blog.dogBehavior,
    },
    {
      id: "3",
      title: "Positive Reinforcement Techniques",
      excerpt:
        "Why positive methods work better than punishment-based training.",
      author: "Blupi Dog Training",
      publishedAt: "2024-01-05",
      tags: ["positive training", "methods", "techniques"],
      image: TEMPLATE_IMAGES.blog.positiveTraining,
    },
  ];

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      <PageHeader 
        title="Blog" 
        subtitle="Discover helpful tips, training techniques, and insights from our dog training experts."
      />
      
      <Container size="lg" pb={80}>
        {/* Search Bar */}
        <Center mb={48}>
          <TextInput
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            size="md"
            style={{ width: "100%", maxWidth: 400 }}
            radius="md"
          />
        </Center>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <Grid>
            {filteredPosts.map((post) => (
              <Grid.Col key={post.id} span={{ base: 12, md: 6, lg: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                  <Card.Section>
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      height={200}
                      fallbackSrc={TEMPLATE_IMAGES.fallback}
                    />
                  </Card.Section>

                  <Stack gap="sm" mt="md" style={{ flex: 1 }}>
                    <Text size="lg" fw={600} c="gray.8" lineClamp={2}>
                      {post.title}
                    </Text>

                    <Text size="sm" c="dimmed" lineClamp={3}>
                      {post.excerpt}
                    </Text>

                    <Group gap="xs" wrap="wrap">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="light" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </Group>

                    <Group justify="space-between" mt="auto">
                      <Text size="xs" c="dimmed">
                        {post.author}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </Text>
                    </Group>

                    <Button
                      variant="light"
                      color="primary"
                      fullWidth
                      mt="md"
                      radius="md"
                    >
                      Read More
                    </Button>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Paper shadow="sm" p="xl" radius="md" ta="center">
            <Stack align="center" gap="md">
              <Text size="lg" c="dimmed">
                No blog posts found matching your search.
              </Text>
              <Text size="sm" c="dimmed">
                Try adjusting your search terms or browse all posts.
              </Text>
            </Stack>
          </Paper>
        )}

        {/* Coming Soon Message */}
        <Paper shadow="sm" p="xl" radius="md" mt={64} bg="primary.0">
          <Stack align="center" gap="md">
            <Text size="xl" fw={600} c="gray.8">
              More Content Coming Soon!
            </Text>
            <Text ta="center" c="dimmed" maw={600}>
              We're working on bringing you more valuable content about dog
              training, pet behavior, and care tips. Check back regularly for new
              posts!
            </Text>
            <Button color="primary" variant="filled" radius="md">
              Subscribe for Updates
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default Blog;