import { Group, HoverCard, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoutButton = () => {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <Group>
      <HoverCard width={80} shadow="md">
        <HoverCard.Target>
          <Logoutbutton
            onClick={() => {
              handleLogout();
            }}
            src="https://imgs.search.brave.com/P13_hEDoty_Mq9kqAiZQ67ifhwcUWWTrdW2KLwq_ZdE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzAyLzgzLzQ1/LzM2MF9GXzkwMjgz/NDUwNV9jZjdWOUV6/aTRYYmx3NHpDUDBI/U3VDT1BOR213Qldn/Zy5qcGc"
          ></Logoutbutton>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">Logout</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};

const Logoutbutton = styled.img`
  position: fixed;
  top: 1vh;
  right: 3vh;
  width: 50px;
  cursor: pointer;

  @media (max-width: 767px) {
    right: 0vh;
  }
`;

export default LogoutButton;
