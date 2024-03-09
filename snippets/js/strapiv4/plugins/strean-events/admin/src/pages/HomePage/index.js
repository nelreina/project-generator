/*
 *
 * HomePage
 *
 */

import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Button } from "@strapi/design-system/Button";
import React, { useState, useEffect } from "react";

import Modal from "../../components/EventStream/Modal";
import {
  addMapping,
  deleteMapping,
  editMapping,
  getAllMapping,
} from "../../api";
import MappingCount from "../../components/EventStream/Count";
import MappingTable from "../../components/EventStream/Table";

const HomePage = () => {
  const [mappings, setMappings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchMappings = async () => {
    setLoading(true);
    const data = await getAllMapping();
    setMappings(data);
    setLoading(false);
  };

  const createMapping = async (data) => {
    await addMapping(data);
    fetchMappings();
  };

  useEffect(async () => {
    await fetchMappings();
    return () => {};
  }, []);

  return (
    <Layout>
      <BaseHeaderLayout
        title="Stream Events Plugin"
        subtitle="Map Redis streams with Strapi services and methods"
        as="h2"
      />

      <ContentLayout>
        <MappingCount count={mappings.length} />
        {mappings.length === 0 ? (
          <EmptyStateLayout
            content="No mapping avaialable"
            action={
              <Button onClick={() => setShowModal(true)}>Add Mapping</Button>
            }
          />
        ) : (
          <MappingTable
            mappingData={mappings}
            editMapping={editMapping}
            deleteMapping={deleteMapping}
            setShowModal={setShowModal}
          />
        )}
      </ContentLayout>
      {showModal && (
        <Modal setShowModal={setShowModal} addMapping={createMapping} />
      )}
    </Layout>
  );
};

export default HomePage;
