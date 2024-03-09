import React, { useState } from "react";
import {
  Table,
  Thead,
  TFooter,
  Tbody,
  Tr,
  Td,
  Th,
} from "@strapi/design-system/Table";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";
import { IconButton } from "@strapi/design-system/IconButton";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { TextInput } from "@strapi/design-system/TextInput";
import Pencil from "@strapi/icons/Pencil";
import Trash from "@strapi/icons/Trash";
import Plus from "@strapi/icons/Plus";

function MappingInput({ value, onChange }) {
  return (
    <TextInput
      type="text"
      aria-label="mapping-input"
      name="mapping-input"
      error={value.length > 40 ? "Text should be less than 40 characters" : ""}
      onChange={onChange}
      value={value}
    />
  );
}

export default function MappingTable({
  mappingData,
  deleteMapping,
  editMapping,
  setShowModal,
}) {
  return (
    <Box
      background="neutral0"
      hasRadius={true}
      shadow="filterShadow"
      padding={8}
      style={{ marginTop: "10px" }}
    >
      <Table
        colCount={4}
        rowCount={10}
        footer={
          <TFooter onClick={() => setShowModal(true)} icon={<Plus />}>
            Add a mapping
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">Event</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Service</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Method()</Typography>
            </Th>

            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {mappingData.map((mapping) => {
            const [eventValue, setEventValue] = useState(mapping.event);
            const [serviceValue, setServiceValue] = useState(mapping.service);
            const [methodValue, setMethodValue] = useState(mapping.method);

            const [isEdit, setIsEdit] = useState(false);

            return (
              <Tr key={mapping.id}>
                <Td>
                  {isEdit ? (
                    <MappingInput
                      value={eventValue}
                      onChange={(e) => setEventValue(e.target.event)}
                    />
                  ) : (
                    <Typography textColor="neutral800">
                      {mapping.event}
                    </Typography>
                  )}
                </Td>
                <Td>
                  {isEdit ? (
                    <MappingInput
                      value={serviceValue}
                      onChange={(e) => setServiceValue(e.target.service)}
                    />
                  ) : (
                    <Typography textColor="neutral800">
                      {mapping.service}
                    </Typography>
                  )}
                </Td>
                <Td>
                  {isEdit ? (
                    <MappingInput
                      value={methodValue}
                      onChange={(e) => setMethodValue(e.target.method)}
                    />
                  ) : (
                    <Typography textColor="neutral800">
                      {mapping.method}
                    </Typography>
                  )}
                </Td>

                <Td>
                  {isEdit ? (
                    <Flex style={{ justifyContent: "end" }}>
                      <Button
                        onClick={() =>
                          editMapping(mapping.id, {
                            eventValue,
                            serviceValue,
                            methodValue,
                          })
                        }
                      >
                        Save
                      </Button>
                    </Flex>
                  ) : (
                    <Flex style={{ justifyContent: "end" }}>
                      <IconButton
                        onClick={() => setIsEdit(true)}
                        label="Edit"
                        noBorder
                        icon={<Pencil />}
                      />

                      <Box paddingLeft={1}>
                        <IconButton
                          onClick={() => deleteMapping(mapping.id)}
                          label="Delete"
                          noBorder
                          icon={<Trash />}
                        />
                      </Box>
                    </Flex>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
