"use client";

import React, { useState } from "react";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Group,
  Text,
  Stack,
  Grid,
  GridCol,
  Badge,
  Card,
  Divider,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNotifications } from "../../hooks/useNotifications";

interface Service {
  id: string;
  name: string;
  description: any;
  price: number;
  currency: string;
  duration: number;
  type: "private" | "group" | "workshop";
  maxParticipants?: number;
  scheduledDate?: string;
  location?: string;
}

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dogName: string;
  dogBreed: string;
  specialRequirements: string;
  emergencyContact: string;
  emergencyPhone: string;
  agreeToTerms: boolean;
  createAccount: boolean;
}

interface BookingFormProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  availabilityInfo?: {
    available: boolean;
    spotsLeft: number;
    maxParticipants: number;
    reason: string;
  };
}

export default function BookingForm({ service, isOpen, onClose, availabilityInfo }: BookingFormProps) {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const form = useForm<BookingFormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dogName: "",
      dogBreed: "",
      specialRequirements: "",
      emergencyContact: "",
      emergencyPhone: "",
      agreeToTerms: false,
      createAccount: true,
    },
    validate: {
      firstName: (value) => (value ? null : "First name is required"),
      lastName: (value) => (value ? null : "Last name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) => (value ? null : "Phone number is required"),
      dogName: (value) => (value ? null : "Dog name is required"),
      dogBreed: (value) => (value ? null : "Dog breed is required"),
      agreeToTerms: (value) => (value ? null : "Please agree to terms and conditions"),
    },
  });

  const handleSubmit = async (values: BookingFormData) => {
    if (!service) return;

    setIsProcessingPayment(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock payment processing - always succeeds for now
      const paymentSuccess = true;
      
      if (paymentSuccess) {
        // Create booking
        const bookingData = {
          serviceId: service.id,
          clientId: "mock-client-id", // In real app, this would come from auth
          paymentIntentId: "mock-payment-intent-" + Date.now(),
        };

        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (response.ok) {
          showSuccess(
            "Booking Confirmed!",
            `Your booking for "${service.name}" has been confirmed. You'll receive a confirmation email shortly.`
          );
          form.reset();
          onClose();
        } else {
          const error = await response.json();
          showError("Booking Failed", error.error || "Failed to create booking");
        }
      } else {
        showError("Payment Failed", "Payment could not be processed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      showError("Booking Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (!service) return null;

  const isFullyBooked = availabilityInfo && !availabilityInfo.available && availabilityInfo.reason === "Fully booked";

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={`Book: ${service.name}`}
      size="lg"
      centered
      styles={{
        header: {
          backgroundColor: "#f8f9fa",
        },
      }}
    >
      <Stack gap="lg">
        {/* Service Summary */}
        <Card shadow="xs" p="md" radius="sm" bg="gray.0">
          <Stack gap="sm">
            <Group justify="space-between">
              <Text fw={600} size="lg">
                {service.name}
              </Text>
              <Badge color={service.type === "group" ? "blue" : "purple"} variant="light">
                {service.type === "group" ? "Group Class" : "Workshop"}
              </Badge>
            </Group>
            
            <Group gap="xl">
              <Text size="sm" c="gray.7">
                ⏱️ Duration: {service.duration} minutes
              </Text>
              {service.maxParticipants && (
                <Text size="sm" c="gray.7">
                  👥 Max: {service.maxParticipants} participants
                </Text>
              )}
            </Group>
            
            {service.scheduledDate && (
              <Text size="sm" c="gray.7">
                📅 Date: {new Date(service.scheduledDate).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            )}
            
            {service.location && (
              <Text size="sm" c="gray.7">
                📍 Location: {service.location}
              </Text>
            )}

            {availabilityInfo && (
              <Text 
                size="sm" 
                c={availabilityInfo.available ? "green" : "red"}
                fw={500}
              >
                {availabilityInfo.available 
                  ? `✅ Available (${availabilityInfo.spotsLeft} spots left)`
                  : `❌ ${availabilityInfo.reason}`
                }
              </Text>
            )}

            <Divider />
            
            <Group justify="space-between">
              <Text fw={600} size="xl">
                Total: £{service.price}
              </Text>
              <Badge color="green" variant="filled" size="lg">
                Free Cancellation
              </Badge>
            </Group>
          </Stack>
        </Card>

        {isFullyBooked ? (
          <Card shadow="xs" p="md" radius="sm" bg="red.0">
            <Stack gap="sm" align="center">
              <Text size="lg" fw={600} c="red">
                Fully Booked
              </Text>
              <Text size="sm" c="gray.7" ta="center">
                This session is fully booked. Please check our other available sessions or contact us for the waiting list.
              </Text>
            </Stack>
          </Card>
        ) : (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              {/* Personal Details */}
              <Text fw={600} c="gray.8">
                Personal Details
              </Text>
              
              <Grid>
                <GridCol span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="First Name"
                    placeholder="Your first name"
                    {...form.getInputProps("firstName")}
                    required
                  />
                </GridCol>
                
                <GridCol span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Last Name"
                    placeholder="Your last name"
                    {...form.getInputProps("lastName")}
                    required
                  />
                </GridCol>
                
                <GridCol span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Email"
                    placeholder="your.email@example.com"
                    {...form.getInputProps("email")}
                    required
                  />
                </GridCol>
                
                <GridCol span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Phone"
                    placeholder="Your phone number"
                    {...form.getInputProps("phone")}
                    required
                  />
                </GridCol>
              </Grid>

              <Divider />

              {/* Dog Details */}
              <Text fw={600} c="gray.8">
                Dog Details
              </Text>
              
              <Grid>
                <GridCol span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Dog's Name"
                    placeholder="Your dog's name"
                    {...form.getInputProps("dogName")}
                    required
                  />
                </GridCol>
                
                <GridCol span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Breed"
                    placeholder="Your dog's breed"
                    {...form.getInputProps("dogBreed")}
                    required
                  />
                </GridCol>
              </Grid>
              
              <Textarea
                label="Special Requirements or Notes"
                placeholder="Any special requirements, behavioral notes, or medical conditions we should know about..."
                minRows={3}
                {...form.getInputProps("specialRequirements")}
              />

              <Divider />

              {/* Emergency Contact */}
              <Text fw={600} c="gray.8">
                Emergency Contact
              </Text>
              
              <Grid>
                <GridCol span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Emergency Contact Name"
                    placeholder="Emergency contact name"
                    {...form.getInputProps("emergencyContact")}
                  />
                </GridCol>
                
                <GridCol span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Emergency Contact Phone"
                    placeholder="Emergency contact phone"
                    {...form.getInputProps("emergencyPhone")}
                  />
                </GridCol>
              </Grid>

              <Divider />

              {/* Checkboxes */}
              <Stack gap="sm">
                <Checkbox
                  label="I agree to the terms and conditions, cancellation policy, and understand that full payment is required to secure my booking"
                  {...form.getInputProps("agreeToTerms", { type: "checkbox" })}
                  required
                />
                
                <Checkbox
                  label="Create an account to manage my bookings and save my details for future bookings"
                  {...form.getInputProps("createAccount", { type: "checkbox" })}
                />
              </Stack>

              {/* Payment Button */}
              <Group justify="center" mt="lg">
                <Button
                  type="submit"
                  size="lg"
                  loading={isProcessingPayment}
                  className="bg-green-900 hover:bg-green-800 text-white"
                  px={40}
                >
                  {isProcessingPayment ? "Processing Payment..." : `Pay £${service.price} & Book Now`}
                </Button>
              </Group>

              <Text size="xs" c="gray.6" ta="center">
                💳 Secure payment powered by mock payment system
                <br />
                🔒 Your payment information is encrypted and secure
              </Text>
            </Stack>
          </form>
        )}
      </Stack>
    </Modal>
  );
}