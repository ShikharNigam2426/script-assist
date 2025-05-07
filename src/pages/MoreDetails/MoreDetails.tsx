import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Paper,
  Button,
  Title,
  Text,
  Group,
  Badge,
  Container,
  Alert,
  Image,
} from "@mantine/core";
import {
  IconArrowBack,
  IconRepeat,
  IconExternalLink,
} from "@tabler/icons-react";

const MoreDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div>No data available.</div>;

  const {
    details,
    success,
    youtubeLink,
    wikipedia,
    name,
    img,
    article,
    presskit,
    active,
    selectedLaunch,
  } = state;

  const isDragon = selectedLaunch === "dragons";

  return (
    <Container size="lg" mt="xl">
      <Group position="apart" mb="xl">
        <Button
          variant="light"
          leftIcon={<IconArrowBack />}
          onClick={() => navigate(-1)}
          style={{ fontWeight: 600 }}
        >
          Back
        </Button>
        <Badge
          color={
            isDragon
              ? active
                ? "green"
                : "red"
              : success
              ? "green"
              : "red"
          }
          size="lg"
          style={{ fontWeight: 600 }}
        >
          {isDragon ? (active ? "Active" : "Inactive") : success ? "Success" : "Failed"}
        </Badge>
      </Group>

      <Paper
        className="p-5"
        shadow="xl"
        radius="md"
        withBorder
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <Title
          order={2}
          align="center"
          mb="md"
          style={{ fontSize: "2rem", fontWeight: 600, color: "#333" }}
        >
          {name}
        </Title>

        <Group position="center" mb="md">
          <Image
            src={img}
            alt={name}
            width={250}
            height={250}
            fit="contain"
            style={{
              borderRadius: "8px",
              boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Group>

        <div className="mb-3">
          <strong>Details:</strong>
          {details ? (
            <Text
              size="lg"
              mt="sm"
              style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555" }}
            >
              {details}
            </Text>
          ) : (
            <Alert
              title="No details found"
              color="yellow"
              variant="outline"
              mt="sm"
            >
              No details available for this item.
            </Alert>
          )}
        </div>

        {(youtubeLink || wikipedia) && (
          <Group position="center" mt="md" spacing="md">
            {youtubeLink && (
              <Button
                className="px-3 py-2"
                color="red"
                component="a"
                href={youtubeLink}
                target="_blank"
                leftIcon={<IconExternalLink />}
                style={{
                  fontWeight: 500,
                  borderRadius: "50px",
                  backgroundColor: "#fa5252",
                  color: "white",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      backgroundColor: "#df4949 !important",
                      color: "#e6e4e4 !important",
                      textDecoration: "none !important",
                    },
                  },
                }}
              >
                Watch on YouTube
              </Button>
            )}

            {wikipedia && (
              <Button
                className="px-3 py-2"
                color="blue"
                component="a"
                href={wikipedia}
                target="_blank"
                leftIcon={<IconExternalLink />}
                style={{
                  fontWeight: 500,
                  borderRadius: "50px",
                  backgroundColor: "#228be6",
                  color: "white",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      backgroundColor: "#1c7ed6 !important",
                      color: "#e6e4e4 !important",
                      textDecoration: "none !important",
                    },
                  },
                }}
              >
                View on Wikipedia
              </Button>
            )}
          </Group>
        )}

        <Group position="center" mt="md">
          <Button
            className="px-3 py-2"
            variant="outline"
            leftIcon={<IconRepeat />}
            onClick={() => navigate(-1)}
            style={{ fontWeight: 500, borderRadius: "50px" }}
          >
            Go Back
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default MoreDetails;
