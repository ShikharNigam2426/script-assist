import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Paper, Text, Grid, Title, Container } from "@mantine/core";
import { IconRocket, IconUfo } from "@tabler/icons-react";

const StyledContainer = styled(Container)`
  text-align: center;
  padding-top: 40px;
`;

const GradientTitle = styled(Title)`
  background: linear-gradient(to right, #fa0000, #0af3ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  margin-bottom: 2rem;
`;

const PaperWrapper = styled.div`
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 16px;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledText = styled(Text)`
  background: linear-gradient(to right, #f12711, #f5af19);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  font-size: 22px;
`;

const SubText = styled(Text)`
  color: #5f5f5f;
  font-size: 14px;
  margin-top: 4px;
`;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = (category: string) => {
    navigate("/alldetails", { state: { category } });
  };

  return (
    <StyledContainer size="md">
      <GradientTitle order={1}>Space Dashboard</GradientTitle>

      <Grid justify="center" gutter="xl">
        <Grid.Col span={6}>
          <PaperWrapper onClick={() => handleClick("launches")}>
            <Paper p="xl" withBorder radius="md">
              <IconRocket size={40} stroke={1.5} style={{ marginBottom: 12 }} />
              <StyledText>Launches</StyledText>
              <SubText>View all rocket launches and details.</SubText>
            </Paper>
          </PaperWrapper>
        </Grid.Col>

        <Grid.Col span={6}>
          <PaperWrapper onClick={() => handleClick("dragons")}>
            <Paper p="xl" withBorder radius="md">
              <IconUfo size={40} stroke={1.5} style={{ marginBottom: 12 }} />
              <StyledText>Dragons</StyledText>
              <SubText>Explore Dragon capsules and missions.</SubText>
            </Paper>
          </PaperWrapper>
        </Grid.Col>
      </Grid>
    </StyledContainer>
  );
};

export default Dashboard;
