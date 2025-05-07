import { FC, useState, useEffect } from "react";
import { Card, Text, Title, Button, Group } from "@mantine/core";
import { IconPhoto, IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface DataItem {
  name: string;
  date: string;
  id: any;
  img: any;
  details: any;
  success?: boolean;
  youtubeLink?: string;
  wikipedia?: string;
  article?: string;
  presskit?: string;
  firstFlight?: string;
  selectedLaunch: any;
}

const DataBox: FC<DataItem> = ({
  id, name, date, img, details, success, youtubeLink, wikipedia, article, presskit, firstFlight, selectedLaunch
}) => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update windowWidth state on window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openSpecificDetail = (id: string | number) => {
    navigate(`/details/${id}`, { state: { details, success, youtubeLink, name, img, wikipedia, article, presskit, firstFlight, selectedLaunch } });
  };

  // Determine if max-width should be applied based on window size
  const cardStyle = {
    width: "100%",
    maxWidth: windowWidth < 476 ? "100%" : "300px", // Use 100% width for smaller screens
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={cardStyle}>
      <Card.Section>
        <img className="p-2" src={img} alt={name} height={160} style={{ objectFit: "contain", width: "100%" }} />
      </Card.Section>

      <Group position="apart" mt="md">
        <Title order={4} style={{ fontSize: "1.1rem", fontWeight: 500 }}>
          {name}
        </Title>
      </Group>

      <Text size="sm" color="dimmed" mt="sm">
        <span className="data-box-created-text">Created on:</span> {date || firstFlight}
      </Text>

      <Button
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        leftIcon={<IconPhoto size={14} />}
        rightIcon={<IconArrowRight size={14} />}
        style={{ fontWeight: 600 }}
        onClick={() => openSpecificDetail(id)}
      >
        View Details
      </Button>
    </Card>
  );
};

export default DataBox;
