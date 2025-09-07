"use client";

import React from "react";
import {
  Container,
  Paper,
  Text,
  Stack,
  Card,
  Group,
  Badge,
  Button,
  Grid,
  GridCol,
  Title,
} from "@mantine/core";
import PageHeader from "../components/common/PageHeader";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="My Dashboard"
        subtitle="Welcome back! Here's an overview of your bookings and account."
      />

      <Container size="lg" pb={80}>
        <Stack gap="xl">
          {/* Quick Stats */}
          <Grid>
            <GridCol span={{ base: 12, sm: 6, md: 3 }}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Text size="xl" fw={700} c="blue">
                  3
                </Text>
                <Text size="sm" c="dimmed">
                  Active Bookings
                </Text>
              </Card>
            </GridCol>
            
            <GridCol span={{ base: 12, sm: 6, md: 3 }}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Text size="xl" fw={700} c="green">
                  8
                </Text>
                <Text size="sm" c="dimmed">
                  Completed Sessions
                </Text>
              </Card>
            </GridCol>

            <GridCol span={{ base: 12, sm: 6, md: 3 }}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Text size="xl" fw={700} c="orange">
                  2
                </Text>
                <Text size="sm" c="dimmed">
                  Pending Inquiries
                </Text>
              </Card>
            </GridCol>

            <GridCol span={{ base: 12, sm: 6, md: 3 }}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Text size="xl" fw={700} c="purple">
                  £420
                </Text>
                <Text size="sm" c="dimmed">
                  Total Spent
                </Text>
              </Card>
            </GridCol>
          </Grid>

          {/* Upcoming Bookings */}
          <Paper shadow="sm" p="xl" radius="md">
            <Stack gap="lg">
              <Group justify="space-between" align="center">
                <Title order={2} c="gray.8">
                  Upcoming Sessions
                </Title>
                <Button variant="light" size="sm">
                  View All
                </Button>
              </Group>

              <Stack gap="md">
                <Card shadow="xs" p="md" radius="sm" withBorder>
                  <Group justify="space-between" wrap="nowrap">
                    <Stack gap="xs">
                      <Text fw={500}>Basic Obedience Class</Text>
                      <Text size="sm" c="dimmed">
                        📅 Saturday, Jan 15, 2025 at 10:00 AM
                      </Text>
                      <Text size="sm" c="dimmed">
                        📍 Blupi Training Center
                      </Text>
                    </Stack>
                    <Badge color="green" variant="light">
                      Confirmed
                    </Badge>
                  </Group>
                </Card>

                <Card shadow="xs" p="md" radius="sm" withBorder>
                  <Group justify="space-between" wrap="nowrap">
                    <Stack gap="xs">
                      <Text fw={500}>Puppy Socialization</Text>
                      <Text size="sm" c="dimmed">
                        📅 Sunday, Jan 23, 2025 at 2:00 PM
                      </Text>
                      <Text size="sm" c="dimmed">
                        📍 Local Park
                      </Text>
                    </Stack>
                    <Badge color="blue" variant="light">
                      Confirmed
                    </Badge>
                  </Group>
                </Card>

                <Card shadow="xs" p="md" radius="sm" withBorder>
                  <Group justify="space-between" wrap="nowrap">
                    <Stack gap="xs">
                      <Text fw={500}>Advanced Training Workshop</Text>
                      <Text size="sm" c="dimmed">
                        📅 Saturday, Feb 5, 2025 at 11:00 AM
                      </Text>
                      <Text size="sm" c="dimmed">
                        📍 Blupi Training Center
                      </Text>
                    </Stack>
                    <Badge color="orange" variant="light">
                      Pending
                    </Badge>
                  </Group>
                </Card>
              </Stack>
            </Stack>
          </Paper>

          {/* Recent Activity */}
          <Paper shadow="sm" p="xl" radius="md">
            <Stack gap="lg">
              <Title order={2} c="gray.8">
                Recent Activity
              </Title>

              <Stack gap="md">
                <Group gap="md">
                  <Text size="sm" c="dimmed" style={{ minWidth: '80px' }}>
                    Jan 10
                  </Text>
                  <Text size="sm">
                    ✅ Completed &ldquo;Basic Commands&rdquo; class
                  </Text>
                </Group>
                
                <Group gap="md">
                  <Text size="sm" c="dimmed" style={{ minWidth: '80px' }}>
                    Jan 8
                  </Text>
                  <Text size="sm">
                    📝 Submitted private session inquiry
                  </Text>
                </Group>
                
                <Group gap="md">
                  <Text size="sm" c="dimmed" style={{ minWidth: '80px' }}>
                    Jan 5
                  </Text>
                  <Text size="sm">
                    💳 Payment processed for &ldquo;Puppy Socialization&rdquo;
                  </Text>
                </Group>
              </Stack>
            </Stack>
          </Paper>

          {/* Quick Actions */}
          <Paper shadow="sm" p="xl" radius="md">
            <Stack gap="lg">
              <Title order={2} c="gray.8">
                Quick Actions
              </Title>

              <Grid>
                <GridCol span={{ base: 12, md: 6 }}>
                  <Button 
                    variant="outline" 
                    size="md" 
                    fullWidth
                    className="h-12"
                  >
                    Browse Services
                  </Button>
                </GridCol>
                
                <GridCol span={{ base: 12, md: 6 }}>
                  <Button 
                    variant="outline" 
                    size="md" 
                    fullWidth
                    className="h-12"
                  >
                    Request Private Session
                  </Button>
                </GridCol>
              </Grid>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </>
  );
}