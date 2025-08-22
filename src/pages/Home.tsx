import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Title, Text, Button, Grid, Image, Stack, Group, Card, Badge } from '@mantine/core';
import { TEMPLATE_IMAGES } from '../constants/images';
import ServiceCard from '../components/common/ServiceCard';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20 px-4">
        <Container size="xl">
          <Grid>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Stack gap="xl">
                <Title order={1} size="3.5rem" fw={700}>
                  Professional Dog Training Services
                </Title>
                <Text size="xl" opacity={0.9}>
                  Don't let minor concerns escalate into expensive issues. We're here for your pet as much as you need us to be, so your best friends can live their longest, healthiest lives.
                </Text>
                <Group gap="md">
                  <Button 
                    component={Link} 
                    to="/contact"
                    size="lg"
                    color="white"
                    variant="filled"
                    radius="md"
                    style={{ color: '#134324' }}
                  >
                    Get Started
                  </Button>
                  <Button
                    component={Link}
                    to="/services/private-session"
                    size="lg"
                    variant="outline"
                    color="white"
                    radius="md"
                  >
                    Our Services
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <div className="flex justify-center">
                <Image
                  src={TEMPLATE_IMAGES.hero}
                  alt="Professional dog training"
                  radius="lg"
                  fallbackSrc={TEMPLATE_IMAGES.fallback}
                  h={400}
                />
              </div>
            </Grid.Col>
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
              Don't let minor concerns escalate into expensive issues. We're here for your pet as much as you need us 
              to be, so your best friends can live their longest, healthiest lives.
            </Text>

            {/* Service Tags */}
            <Group justify="center" gap="md">
              <Badge size="lg" variant="filled" color="pink">NEW PUPPIES</Badge>
              <Badge size="lg" variant="filled" color="yellow">NEW KITTENS</Badge>
              <Badge size="lg" variant="filled" color="blue">SICKNESS</Badge>
              <Badge size="lg" variant="filled" color="red">CHRONIC ILLNESS</Badge>
              <Badge size="lg" variant="filled" color="violet">TRAVEL CERTIFICATES</Badge>
              <Badge size="lg" variant="filled" color="primary">HEALTHCHECKS</Badge>
            </Group>

            {/* Services Grid */}
            <Grid mt="xl">
              <Grid.Col span={{ base: 12, md: 4 }}>
                <ServiceCard
                  title="Private 1-2-1 Sessions"
                  description="Personalized one-on-one training sessions tailored to your dog's specific needs."
                  price="From £75"
                  image={TEMPLATE_IMAGES.privateSession}
                  link="/services/private-session"
                  badge="Popular"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <ServiceCard
                  title="Group Classes"
                  description="Social learning environment where dogs learn alongside other pets."
                  price="From £45"
                  image={TEMPLATE_IMAGES.groupClass}
                  link="/services/group-class"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <ServiceCard
                  title="Workshops"
                  description="Intensive workshops focusing on specific training topics and techniques."
                  price="From £35"
                  image={TEMPLATE_IMAGES.workshop}
                  link="/services/workshop"
                />
              </Grid.Col>
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
            {[1, 2, 3, 4].map((i) => (
              <Grid.Col key={i} span={{ base: 12, sm: 6, lg: 3 }}>
                <Card shadow="sm" p="lg" radius="md" bg="white">
                  <Group mb="md">
                    <Image
                      src={TEMPLATE_IMAGES.testimonials[i - 1]}
                      alt={`Client ${i}`}
                      w={48}
                      h={48}
                      radius="xl"
                      fallbackSrc={TEMPLATE_IMAGES.avatar}
                    />
                    <div>
                      <Text fw={600}>Happy Client {i}</Text>
                      <Group gap={2}>
                        {'★★★★★'.split('').map((star, idx) => (
                          <Text key={idx} c="yellow.6" size="sm">{star}</Text>
                        ))}
                      </Group>
                    </div>
                  </Group>
                  <Text size="sm" c="dimmed">
                    "Amazing experience with professional training. Our dog has improved so much! Highly recommend Blupi Dog Training."
                  </Text>
                </Card>
              </Grid.Col>
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
              <Stack align="center">
                <Image
                  src={TEMPLATE_IMAGES.certifications.abtc}
                  alt="ABTC Certification"
                  w={80}
                  h={80}
                  radius="md"
                />
                <Text ta="center" size="sm" c="dimmed">
                  Registered Training Instructor
                </Text>
              </Stack>
              <Stack align="center">
                <Image
                  src={TEMPLATE_IMAGES.certifications.aggressive}
                  alt="AggressiveDog.com Certification"
                  w={80}
                  h={80}
                  radius="md"
                />
                <Text ta="center" size="sm" c="dimmed">
                  AggressiveDog.com Specialist
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Container>
      </section>
    </div>
  );
};

export default Home;