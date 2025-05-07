import { FC } from "react";
import {
  Card,
  Image,
  Text,
  Title,
  Button,
  Group,
  Badge,
  Stack,
} from "@mantine/core";
import { IconPhoto, IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface Dragons {
  name: string;
  id: string;
  type: string;
  img: string;
  active: boolean;
  details: string;
  wikipedia: string;
  selectedLaunch: string;
}

const DragonBox: FC<Dragons> = ({
  name,
  id,
  type,
  img,
  active,
  details,
  wikipedia,
  selectedLaunch,
}) => {
  const navigate = useNavigate();

  const openSpecificDetail = () => {
    navigate(`/details/${id}`, {
      state: { name, id, type, img, active, details, wikipedia, selectedLaunch },
    });
  };

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
      style={{ width: "100%", maxWidth: 320, minHeight: 420 }}
    >
      <Card.Section>
        <Image
          src={img}
          height={180}
          fit="cover"
          alt={name}
          withPlaceholder
        />
      </Card.Section>

      <Stack spacing="xs" mt="md">
        <Group position="apart">
          <Title order={4} style={{ fontSize: 18 }}>
            {name}
          </Title>
          <Badge color={active ? "green" : "red"} variant="light">
            {active ? "Active" : "Retired"}
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
          <strong>Type:</strong> {type}
        </Text>

        <Text size="sm" lineClamp={3}>
          {details || "No description available."}
        </Text>
      </Stack>

      <Button
        fullWidth
        mt="md"
        radius="md"
        onClick={openSpecificDetail}
        leftIcon={<IconPhoto size={16} />}
        rightIcon={<IconArrowRight size={16} />}
      >
        View Details
      </Button>
    </Card>
  );
};

export default DragonBox;
