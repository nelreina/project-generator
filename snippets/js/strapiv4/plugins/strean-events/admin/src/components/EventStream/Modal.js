import React, { useState } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
} from "@strapi/design-system";
import { Box } from "@strapi/design-system/Box";

export default function TodoModal({ setShowModal, addMapping }) {
  const [eventName, setEventName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [methodName, setMethodName] = useState("");
  const handleSubmit = async (e) => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    try {
      await addMapping({
        event: eventName,
        service: serviceName,
        method: methodName,
      });
      setShowModal(false);
    } catch (e) {
      console.log("error", e);
    }
  };

  const getError = () => {
    // Form validation error
    return null;
  };

  return (
    <ModalLayout
      onClose={() => setShowModal(false)}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add Event Mapping
        </Typography>
      </ModalHeader>

      <ModalBody>
        <TextInput
          placeholder="What is the event name?"
          label="Event"
          name="event"
          error={getError()}
          onChange={(e) => setEventName(e.target.value)}
          value={eventName}
        />
        <Box padding={3} />
        <TextInput
          placeholder="What is the service name?"
          label="Service"
          name="text"
          error={getError()}
          onChange={(e) => setServiceName(e.target.value)}
          value={serviceName}
        />
        <Box padding={3} />
        <TextInput
          placeholder="What is the method name?"
          label="Method"
          name="text"
          error={getError()}
          onChange={(e) => setMethodName(e.target.value)}
          value={methodName}
        />
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Add todo</Button>}
      />
    </ModalLayout>
  );
}
