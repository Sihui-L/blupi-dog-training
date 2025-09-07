"use client";

import React from "react";
import {
  Container,
  Paper,
  TextInput,
  Textarea,
  Button,
  Grid,
  GridCol,
  Group,
  Text,
  Stack,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNotifications } from "../../hooks/useNotifications";
import PageHeader from "../../components/common/PageHeader";

interface PrivateSessionFormData {
  firstName: string;
  lastName: string;
  clientNumber: string;
  email: string;
  phone: string;
  dogName: string;
  dogBreed: string;
  healthCheck: string;
  behaviorIssues: string;
  developmentBehaviors: string;
}

export default function PrivateSessionPage() {
  const { showSuccess } = useNotifications();

  const form = useForm<PrivateSessionFormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      clientNumber: "",
      email: "",
      phone: "",
      dogName: "",
      dogBreed: "",
      healthCheck: "",
      behaviorIssues: "",
      developmentBehaviors: "",
    },
    validate: {
      firstName: (value) => (value ? null : "First name is required"),
      lastName: (value) => (value ? null : "Last name is required"),
      clientNumber: (value) => (value ? null : "Client number is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) => (value ? null : "Phone number is required"),
      dogName: (value) => (value ? null : "Dog name is required"),
      dogBreed: (value) => (value ? null : "Dog breed is required"),
      healthCheck: (value) => (value ? null : "Health check information is required"),
      behaviorIssues: (value) => (value ? null : "Behavior information is required"),
      developmentBehaviors: (value) => (value ? null : "Development behavior information is required"),
    },
  });

  const handleSubmit = (values: PrivateSessionFormData) => {
    console.log("Private session inquiry:", values);
    showSuccess("Success", "Your private session inquiry has been submitted! We'll contact you soon to discuss your needs.");
    form.reset();
  };

  return (
    <>
      <PageHeader
        title="Private 1-2-1 session"
        subtitle="Don't let minor concerns escalate into expensive issues. We're here for your pet as much as you need us to be, so your best friends can live their longest, healthiest lives."
      />

      <Container size="md" pb={80}>
        <Stack gap="xl">
          {/* Who is this session for section */}
          <Paper p="xl" radius="md" bg="gray.0">
            <Stack gap="lg">
              <Title order={2} ta="center" c="gray.8">
                Who is this session for?
              </Title>
              <Grid>
                <GridCol span={{ base: 12, md: 4 }}>
                  <Text ta="center" size="sm" c="gray.7">
                    New puppy owners needing guidance
                  </Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                  <Text ta="center" size="sm" c="gray.7">
                    Dogs with specific behavioral issues
                  </Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                  <Text ta="center" size="sm" c="gray.7">
                    Owners wanting personalized training
                  </Text>
                </GridCol>
              </Grid>
            </Stack>
          </Paper>

          {/* How many sessions section */}
          <Paper p="xl" radius="md" bg="gray.0">
            <Stack gap="lg">
              <Title order={2} ta="center" c="gray.8">
                How many sessions?
              </Title>
              <Grid>
                <GridCol span={{ base: 12, md: 6 }}>
                  <Text ta="center" size="sm" c="gray.7">
                    Single session assessments available
                  </Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 6 }}>
                  <Text ta="center" size="sm" c="gray.7">
                    Multi-session packages for ongoing support
                  </Text>
                </GridCol>
              </Grid>
            </Stack>
          </Paper>

          {/* Private Session Inquiry Form */}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="xl">
              {/* Client Details Section */}
              <Paper shadow="md" p="xl" radius="md">
                <Text size="xl" fw={600} mb="lg" c="gray.8">
                  Client Details
                </Text>

                <Grid>
                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="First Name"
                      placeholder="Enter your first name"
                      withAsterisk
                      {...form.getInputProps("firstName")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Last Name"
                      placeholder="Enter your last name"
                      withAsterisk
                      {...form.getInputProps("lastName")}
                    />
                  </GridCol>

                  <GridCol span={12}>
                    <TextInput
                      label="Client Number"
                      placeholder="Enter your client number"
                      withAsterisk
                      {...form.getInputProps("clientNumber")}
                    />
                  </GridCol>

                  <GridCol span={12}>
                    <TextInput
                      label="Email"
                      placeholder="Enter your email address"
                      withAsterisk
                      {...form.getInputProps("email")}
                    />
                  </GridCol>

                  <GridCol span={12}>
                    <TextInput
                      label="Phone"
                      placeholder="Enter your phone number"
                      withAsterisk
                      {...form.getInputProps("phone")}
                    />
                  </GridCol>
                </Grid>
              </Paper>

              {/* About Your Dog Section */}
              <Paper shadow="md" p="xl" radius="md">
                <Text size="xl" fw={600} mb="lg" c="gray.8">
                  About Your Dog
                </Text>

                <Stack gap="md">
                  <TextInput
                    label="Name of Dog"
                    placeholder="Enter your dog's name"
                    withAsterisk
                    {...form.getInputProps("dogName")}
                  />

                  <TextInput
                    label="Breed"
                    placeholder="Enter your dog's breed"
                    withAsterisk
                    {...form.getInputProps("dogBreed")}
                  />

                  <Textarea
                    label="Has your dog been to the vet in the past 12 months for any reason other than a routine annual check up? If so, please give details."
                    placeholder="Please provide details about vet visits..."
                    minRows={4}
                    withAsterisk
                    {...form.getInputProps("healthCheck")}
                  />

                  <Textarea
                    label="Has your dog shown any unpredictable behaviour? If so, please give details."
                    placeholder="Please describe any unpredictable behaviors..."
                    minRows={4}
                    withAsterisk
                    {...form.getInputProps("behaviorIssues")}
                  />

                  <Textarea
                    label="Has your dog shown any developmental behaviours, this could include but not limited to: excessive licking, grooming, stretching, jumping up, perhaps? If so, please give details."
                    placeholder="Please describe any developmental behaviors..."
                    minRows={4}
                    withAsterisk
                    {...form.getInputProps("developmentBehaviors")}
                  />
                </Stack>
              </Paper>

              {/* Submit Button */}
              <Group justify="center">
                <Button
                  type="submit"
                  size="lg"
                  radius="md"
                  className="bg-green-900 hover:bg-green-800 text-white"
                >
                  Submit Private Session Inquiry
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Container>
    </>
  );
}