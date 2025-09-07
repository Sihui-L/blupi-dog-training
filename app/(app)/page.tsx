"use client";

import React from "react";
import Link from "next/link";
import {
  Container,
  Title,
  Text,
  Button,
  Grid,
  GridCol,
  Image,
  Stack,
  Group,
  Card,
  Badge,
} from "@mantine/core";
import { TEMPLATE_IMAGES } from "./constants/images";
import ServiceCard from "./components/common/ServiceCard";

export default function HomePage() {
  // Static testimonials data
  const testimonials = [
    {
      id: 1,
      clientName: "Sarah Johnson",
      review:
        "Amazing experience with professional training. Our dog Charlie has improved so much! The trainer was patient and knowledgeable.",
      rating: 5,
      photo: TEMPLATE_IMAGES.testimonials[0],
    },
    {
      id: 2,
      clientName: "Michael Chen",
      review:
        "Excellent service! Our puppy learned basic commands quickly and the socialization sessions were fantastic. Highly recommend!",
      rating: 5,
      photo: TEMPLATE_IMAGES.testimonials[1],
    },
    {
      id: 3,
      clientName: "Emma Williams",
      review:
        "Professional and caring approach. They helped us with our rescue dog's anxiety issues. Couldn't be happier with the results!",
      rating: 5,
      photo: TEMPLATE_IMAGES.testimonials[2],
    },
    {
      id: 4,
      clientName: "David Thompson",
      review:
        "Outstanding training program! Our German Shepherd now walks perfectly on leash and responds to all commands. Worth every penny!",
      rating: 5,
      photo: TEMPLATE_IMAGES.testimonials[3],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 to-cyan-700 text-white py-20 px-4">
        <Container size="xl">
          <Grid>
            <GridCol span={{ base: 12, lg: 6 }}>
              <Stack gap="xl">
                <Title order={1} size="3.5rem" fw={700}>
                  Professional Dog Training Services
                </Title>
                <Text size="xl" opacity={0.9}>
                  Don&apos;t let minor concerns escalate into expensive issues.
                  We&apos;re here for your pet as much as you need us to be, so
                  your best friends can live their longest, healthiest lives.
                </Text>
                <Group gap="md">
                  <Button
                    component={Link}
                    href="/services/private-session"
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-green-900"
                    radius="md"
                  >
                    Our Services
                  </Button>
                  <Button
                    component={Link}
                    href="/contact"
                    size="lg"
                    variant="filled"
                    radius="md"
                    className="bg-green-900 hover:bg-green-800 text-white"
                  >
                    Get Started
                  </Button>
                </Group>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, lg: 6 }}>
              <div className="flex justify-center">
                <Image
                  src={TEMPLATE_IMAGES.hero}
                  alt="Professional dog training"
                  radius="lg"
                  fallbackSrc={TEMPLATE_IMAGES.fallback}
                  h={400}
                />
              </div>
            </GridCol>
          </Grid>
        </Container>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <Container size="lg">
          <Stack align="center" gap="xl">
            <Title order={2} ta="center" size="2.5rem" c="gray.8">
              Introduction
            </Title>
            <Text ta="center" size="lg" c="dimmed" maw={800}>
              Don&apos;t let minor concerns escalate into expensive issues.
              We&apos;re here for your pet as much as you need us to be, so your
              best friends can live their longest, healthiest lives.
            </Text>

            {/* Service Tags */}
            <Group justify="center" gap="md">
              <Badge size="lg" variant="filled" color="pink">
                NEW PUPPIES
              </Badge>
              <Badge size="lg" variant="filled" color="yellow">
                NEW KITTENS
              </Badge>
              <Badge size="lg" variant="filled" color="blue">
                SICKNESS
              </Badge>
              <Badge size="lg" variant="filled" color="red">
                CHRONIC ILLNESS
              </Badge>
              <Badge size="lg" variant="filled" color="violet">
                TRAVEL CERTIFICATES
              </Badge>
              <Badge
                size="lg"
                variant="filled"
                className="bg-green-900 text-white"
              >
                HEALTHCHECKS
              </Badge>
            </Group>

            {/* Services Grid */}
            <Grid mt="xl">
              <GridCol span={{ base: 12, md: 4 }}>
                <ServiceCard
                  title="Private 1-2-1 Sessions"
                  description="Personalized one-on-one training sessions tailored to your dog's specific needs."
                  price="From £75"
                  image={TEMPLATE_IMAGES.privateSession}
                  link="/services/private-session"
                  badge="Popular"
                />
              </GridCol>

              <GridCol span={{ base: 12, md: 4 }}>
                <ServiceCard
                  title="Group Classes"
                  description="Social learning environment where dogs learn alongside other pets."
                  price="From £45"
                  image={TEMPLATE_IMAGES.groupClass}
                  link="/services/group-class"
                />
              </GridCol>

              <GridCol span={{ base: 12, md: 4 }}>
                <ServiceCard
                  title="Workshops"
                  description="Intensive workshops focusing on specific training topics and techniques."
                  price="From £35"
                  image={TEMPLATE_IMAGES.workshop}
                  link="/services/workshop"
                />
              </GridCol>
            </Grid>
          </Stack>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 px-4">
        <Container size="xl">
          <Title order={2} ta="center" mb={48} size="2.5rem" c="gray.8">
            What You Say About Us
          </Title>
          <Grid>
            {testimonials.map((testimonial) => (
              <GridCol key={testimonial.id} span={{ base: 12, sm: 6, lg: 3 }}>
                <Card shadow="sm" p="lg" radius="md" bg="white">
                  <Group mb="md">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.clientName}
                      w={48}
                      h={48}
                      radius="xl"
                      fallbackSrc={TEMPLATE_IMAGES.avatar}
                    />
                    <div>
                      <Text fw={600}>{testimonial.clientName}</Text>
                      <Group gap={2}>
                        {Array.from({ length: 5 }, (_, idx) => (
                          <Text
                            key={idx}
                            c={idx < testimonial.rating ? "yellow.6" : "gray.3"}
                            size="sm"
                          >
                            ★
                          </Text>
                        ))}
                      </Group>
                    </div>
                  </Group>
                  <Text size="sm" c="dimmed">
                    &quot;{testimonial.review}&quot;
                  </Text>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4">
        <Container size="lg">
          <Stack align="center" gap="xl">
            <Title order={2} ta="center" size="2.5rem" c="gray.8">
              Certifications
            </Title>
            <Group justify="center" gap="xl">
              <Stack align="center" gap="md">
                <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    src={TEMPLATE_IMAGES.certifications.abtc}
                    alt="ABTC Certification"
                    fit="contain"
                    w={80}
                    h={80}
                    radius="md"
                  />
                </div>
                <Text ta="center" size="sm" c="dimmed" maw={120}>
                  ABTC Registered Training Instructor
                </Text>
              </Stack>
              <Stack align="center" gap="md">
                <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    src={TEMPLATE_IMAGES.certifications.ccpdt}
                    alt="CCPDT Certification"
                    fit="contain"
                    w={80}
                    h={80}
                    radius="md"
                  />
                </div>
                <Text ta="center" size="sm" c="dimmed" maw={120}>
                  CCPDT Certified Professional Dog Trainer
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Container>
      </section>
    </div>
  );
}
