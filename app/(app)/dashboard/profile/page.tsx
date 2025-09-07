"use client";

import React from "react";
import {
  Container,
  Paper,
  TextInput,
  Textarea,
  Button,
  Group,
  Text,
  Stack,
  Grid,
  GridCol,
  Title,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNotifications } from "../../hooks/useNotifications";
import PageHeader from "../../components/common/PageHeader";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface DogProfileData {
  name: string;
  breed: string;
  age: string;
  weight: string;
  medicalConditions: string;
  behaviorNotes: string;
  emergencyVet: string;
  vetPhone: string;
}

export default function ProfilePage() {
  const { showSuccess } = useNotifications();

  const profileForm = useForm<ProfileData>({
    initialValues: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      phone: "+44 7123 456 789",
      address: "123 Main Street, Buckingham, HP18 0AA",
      emergencyContact: "Jane Smith",
      emergencyPhone: "+44 7987 654 321",
    },
    validate: {
      firstName: (value) => (value ? null : "First name is required"),
      lastName: (value) => (value ? null : "Last name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) => (value ? null : "Phone number is required"),
    },
  });

  const dogForm = useForm<DogProfileData>({
    initialValues: {
      name: "Buddy",
      breed: "Golden Retriever",
      age: "2 years",
      weight: "30kg",
      medicalConditions: "None currently",
      behaviorNotes: "Friendly with other dogs, sometimes pulls on lead",
      emergencyVet: "Buckingham Veterinary Practice",
      vetPhone: "+44 1280 123456",
    },
    validate: {
      name: (value) => (value ? null : "Dog name is required"),
      breed: (value) => (value ? null : "Breed is required"),
    },
  });

  const handleProfileSubmit = (values: ProfileData) => {
    console.log("Profile updated:", values);
    showSuccess("Success", "Your profile has been updated successfully!");
  };

  const handleDogSubmit = (values: DogProfileData) => {
    console.log("Dog profile updated:", values);
    showSuccess("Success", "Your dog's profile has been updated successfully!");
  };

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="Update your personal information and your dog's details"
      />

      <Container size="md" pb={80}>
        <Stack gap="xl">
          {/* Personal Information */}
          <Paper shadow="sm" p="xl" radius="md">
            <form onSubmit={profileForm.onSubmit(handleProfileSubmit)}>
              <Stack gap="lg">
                <Title order={2} c="gray.8">
                  Personal Information
                </Title>

                <Grid>
                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="First Name"
                      placeholder="Enter your first name"
                      {...profileForm.getInputProps("firstName")}
                      required
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Last Name"
                      placeholder="Enter your last name"
                      {...profileForm.getInputProps("lastName")}
                      required
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Email"
                      placeholder="your.email@example.com"
                      {...profileForm.getInputProps("email")}
                      required
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Phone"
                      placeholder="Your phone number"
                      {...profileForm.getInputProps("phone")}
                      required
                    />
                  </GridCol>

                  <GridCol span={12}>
                    <Textarea
                      label="Address"
                      placeholder="Enter your full address"
                      minRows={3}
                      {...profileForm.getInputProps("address")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Emergency Contact Name"
                      placeholder="Emergency contact name"
                      {...profileForm.getInputProps("emergencyContact")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Emergency Contact Phone"
                      placeholder="Emergency contact phone"
                      {...profileForm.getInputProps("emergencyPhone")}
                    />
                  </GridCol>
                </Grid>

                <Group justify="flex-end">
                  <Button
                    type="submit"
                    className="bg-green-900 hover:bg-green-800 text-white"
                  >
                    Update Profile
                  </Button>
                </Group>
              </Stack>
            </form>
          </Paper>

          {/* Dog Information */}
          <Paper shadow="sm" p="xl" radius="md">
            <form onSubmit={dogForm.onSubmit(handleDogSubmit)}>
              <Stack gap="lg">
                <Title order={2} c="gray.8">
                  Dog Information
                </Title>

                <Grid>
                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Dog's Name"
                      placeholder="Enter your dog's name"
                      {...dogForm.getInputProps("name")}
                      required
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Breed"
                      placeholder="Enter your dog's breed"
                      {...dogForm.getInputProps("breed")}
                      required
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Age"
                      placeholder="e.g., 2 years, 6 months"
                      {...dogForm.getInputProps("age")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Weight"
                      placeholder="e.g., 25kg, 15 lbs"
                      {...dogForm.getInputProps("weight")}
                    />
                  </GridCol>

                  <GridCol span={12}>
                    <Textarea
                      label="Medical Conditions"
                      placeholder="Any medical conditions, allergies, or medications"
                      minRows={3}
                      {...dogForm.getInputProps("medicalConditions")}
                    />
                  </GridCol>

                  <GridCol span={12}>
                    <Textarea
                      label="Behavior Notes"
                      placeholder="Any behavioral notes, training history, or specific concerns"
                      minRows={3}
                      {...dogForm.getInputProps("behaviorNotes")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Emergency Vet"
                      placeholder="Your regular veterinary practice"
                      {...dogForm.getInputProps("emergencyVet")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Vet Phone Number"
                      placeholder="Veterinary practice phone number"
                      {...dogForm.getInputProps("vetPhone")}
                    />
                  </GridCol>
                </Grid>

                <Group justify="flex-end">
                  <Button
                    type="submit"
                    className="bg-green-900 hover:bg-green-800 text-white"
                  >
                    Update Dog Profile
                  </Button>
                </Group>
              </Stack>
            </form>
          </Paper>

          {/* Account Actions */}
          <Paper shadow="sm" p="xl" radius="md">
            <Stack gap="lg">
              <Title order={2} c="gray.8">
                Account Actions
              </Title>

              <Divider />

              <Group justify="space-between" wrap="nowrap">
                <Stack gap="xs">
                  <Text fw={500}>Change Password</Text>
                  <Text size="sm" c="dimmed">
                    Update your account password for security
                  </Text>
                </Stack>
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </Group>

              <Divider />

              <Group justify="space-between" wrap="nowrap">
                <Stack gap="xs">
                  <Text fw={500}>Download Data</Text>
                  <Text size="sm" c="dimmed">
                    Download a copy of all your account data
                  </Text>
                </Stack>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </Group>

              <Divider />

              <Group justify="space-between" wrap="nowrap">
                <Stack gap="xs">
                  <Text fw={500} c="red">
                    Delete Account
                  </Text>
                  <Text size="sm" c="dimmed">
                    Permanently delete your account and all data
                  </Text>
                </Stack>
                <Button variant="outline" color="red" size="sm">
                  Delete Account
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </>
  );
}