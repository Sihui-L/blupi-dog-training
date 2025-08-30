import React from "react";
import { Container, Text, Grid, GridCol, Stack, Image, Card, List, ListItem } from "@mantine/core";
import { TEMPLATE_IMAGES } from "../constants/images";
import PageHeader from "../components/common/PageHeader";

export default function AboutPage() {
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
            <GridCol span={{ base: 12, lg: 6 }}>
              <Stack gap="md">
                <Text size="xl" fw={600} c="green.9">
                  Helping Pets & People
                </Text>
                <Text c="gray.7">
                  It&apos;s my mission to make your life better with the power
                  of positive pet training.
                </Text>
                <Text c="gray.7">
                  That&apos;s why I&apos;ve developed my animal husbandry and
                  training skills for the past 16 years by completing an
                  internationally recognised natural horsemanship training
                  course, rehabilitating rescue dogs for Stokenchurch Dog
                  Rescue, and caring for dogs and cats via my walking and pet
                  sitting business, Walks and Purrs.
                </Text>
                <Text c="gray.7">
                  I&apos;ll ease the burden and stress caused by your fighting
                  felines, howling hound, or peeing puppy. With my support,
                  you&apos;ll delight in your pet&apos;s behaviour.
                </Text>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, lg: 6 }}>
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
            </GridCol>
          </Grid>

          {/* Guiding Principle Section */}
          <Grid align="center">
            <GridCol span={{ base: 12, lg: 6 }} order={{ base: 2, lg: 1 }}>
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
            </GridCol>
            <GridCol span={{ base: 12, lg: 6 }} order={{ base: 1, lg: 2 }}>
              <Stack gap="md">
                <Text size="xl" fw={600} c="green.9">
                  Guiding Principle
                </Text>
                <Text c="gray.7">
                  My lost bloodied, highly-strung horse aptly named Highlight
                  unseated me so often I had head-to-toe bruises. With every new
                  behaviour I compassionately and humanely taught Highlight, my
                  body more blossomed into a people-loving, confident companion.
                </Text>
                <Text c="gray.7">
                  That&apos;s why I only use gentle, positive training methods
                  while providing effective dog, puppy, cat, or kitten
                  behavioural solutions.
                </Text>
                <Text c="gray.7">
                  Experience the freedom that comes from sharing life with an
                  animal that happily makes good choices while retaining the fun
                  personality you fell in love with — just like I do with my
                  Highlight.
                </Text>
              </Stack>
            </GridCol>
          </Grid>

          {/* Experience & Qualifications */}
          <Card shadow="sm" p="xl" radius="md" bg="gray.0">
            <Text size="xl" fw={600} ta="center" mb="lg" c="primary.9">
              Experience & Qualifications
            </Text>
            <Grid>
              <GridCol span={{ base: 12, md: 6 }}>
                <Stack gap="md">
                  <Text size="lg" fw={600}>
                    Professional Training
                  </Text>
                  <List spacing="xs" c="gray.7">
                    <ListItem>
                      16 years of animal husbandry and training experience
                    </ListItem>
                    <ListItem>
                      Internationally recognised natural horsemanship course
                    </ListItem>
                    <ListItem>
                      ABTC Registered Training Instructor certification
                    </ListItem>
                    <ListItem>AggressiveDog.com specialist training</ListItem>
                  </List>
                </Stack>
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <Stack gap="md">
                  <Text size="lg" fw={600}>
                    Practical Experience
                  </Text>
                  <List spacing="xs" c="gray.7">
                    <ListItem>
                      Dog rehabilitation for Stokenchurch Dog Rescue
                    </ListItem>
                    <ListItem>
                      Professional pet sitting and walking services
                    </ListItem>
                    <ListItem>
                      Specialized in behavioral modification
                    </ListItem>
                    <ListItem>
                      Positive reinforcement training methods
                    </ListItem>
                  </List>
                </Stack>
              </GridCol>
            </Grid>
          </Card>

          {/* Mission Statement */}
          <Stack align="center" gap="md">
            <Text size="xl" fw={600} c="primary.9">
              Our Mission
            </Text>
            <Text size="lg" ta="center" c="gray.7" maw={800}>
              To create lasting, positive relationships between pets and their
              families through compassionate, effective training that respects
              both the animal&apos;s nature and the family&apos;s lifestyle
              needs.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
