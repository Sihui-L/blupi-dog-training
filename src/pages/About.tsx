import React from 'react';
import { Container, Text, Grid, Stack, Image, Card, List } from '@mantine/core';
import { TEMPLATE_IMAGES } from '../constants/images';
import PageHeader from '../components/common/PageHeader';

const About: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="About" 
        subtitle="Learn about our mission to make your life better with the power of positive pet training."
      />
      
      <Container size="lg" pb={80}>
        <Stack gap="xl">
          {/* Helping Pets & People Section */}
          <Grid align="center">
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Stack gap="md">
                <Text size="xl" fw={600} c="primary.9">
                  Helping Pets & People
                </Text>
                <Text c="gray.7">
                  It's my mission to make your life better with the power of positive pet training.
                </Text>
                <Text c="gray.7">
                  That's why I've developed my animal husbandry and training skills for the past 16 years by 
                  completing an internationally recognised natural horsemanship training course, 
                  rehabilitating rescue dogs for Stokenchurch Dog Rescue, and caring for dogs and cats via my 
                  walking and pet sitting business, Walks and Purrs.
                </Text>
                <Text c="gray.7">
                  I'll ease the burden and stress caused by your fighting felines, howling hound, or peeing puppy. 
                  With my support, you'll delight in your pet's behaviour.
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <div className="flex justify-center">
                <Image
                  src={TEMPLATE_IMAGES.about.trainer}
                  alt="Professional dog trainer with dog"
                  radius="lg"
                  fallbackSrc={TEMPLATE_IMAGES.fallback}
                  w={320}
                  h={256}
                />
              </div>
            </Grid.Col>
          </Grid>

          {/* Guiding Principle Section */}
          <Grid align="center">
            <Grid.Col span={{ base: 12, lg: 6 }} order={{ base: 2, lg: 1 }}>
              <div className="flex justify-center">
                <Image
                  src={TEMPLATE_IMAGES.about.horse}
                  alt="Horse training experience"
                  radius="lg"
                  fallbackSrc={TEMPLATE_IMAGES.fallback}
                  w={320}
                  h={256}
                />
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 6 }} order={{ base: 1, lg: 2 }}>
              <Stack gap="md">
                <Text size="xl" fw={600} c="primary.9">
                  Guiding Principle
                </Text>
                <Text c="gray.7">
                  My lost bloodied, highly-strong horse aptly named Highlight unsocked me so often I had head-to-toe 
                  bruises. With every new behaviour I compassionately and humanely taught Highlight, my body more 
                  blossomed into a people-loving, confident companion.
                </Text>
                <Text c="gray.7">
                  That's why I only use gentle, positive training methods while providing effective dog, puppy, cat, 
                  or kitten behavioural solutions.
                </Text>
                <Text c="gray.7">
                  Experience the freedom that comes from sharing life with an animal that happily makes good choices while 
                  retaining the fun personality you fell in love with — just like I do with my Highlight.
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>

          {/* Experience & Qualifications */}
          <Card shadow="sm" p="xl" radius="md" bg="gray.0">
            <Text size="xl" fw={600} ta="center" mb="lg" c="primary.9">
              Experience & Qualifications
            </Text>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md">
                  <Text size="lg" fw={600}>
                    Professional Training
                  </Text>
                  <List spacing="xs" c="gray.7">
                    <List.Item>16 years of animal husbandry and training experience</List.Item>
                    <List.Item>Internationally recognised natural horsemanship course</List.Item>
                    <List.Item>ABTC Registered Training Instructor certification</List.Item>
                    <List.Item>AggressiveDog.com specialist training</List.Item>
                  </List>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md">
                  <Text size="lg" fw={600}>
                    Practical Experience
                  </Text>
                  <List spacing="xs" c="gray.7">
                    <List.Item>Dog rehabilitation for Stokenchurch Dog Rescue</List.Item>
                    <List.Item>Professional pet sitting and walking services</List.Item>
                    <List.Item>Specialized in behavioral modification</List.Item>
                    <List.Item>Positive reinforcement training methods</List.Item>
                  </List>
                </Stack>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Mission Statement */}
          <Stack align="center" gap="md">
            <Text size="xl" fw={600} c="primary.9">
              Our Mission
            </Text>
            <Text size="lg" ta="center" c="gray.7" maw={800}>
              To create lasting, positive relationships between pets and their families through compassionate, 
              effective training that respects both the animal's nature and the family's lifestyle needs.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default About;