import {
  Container,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface IProps {
  value: number;
  caption: string;
  date: string;
  navLink: string;
}

export default function StatCard({
  value,
  caption,
  date,
  navLink,
}: Readonly<IProps>) {
  const navigate = useNavigate();
  return (
    <Container cursor={navLink !== "" ? "pointer" : ""}>
      <Card onClick={() => navigate(navLink)}>
        <CardBody>
          <Stat>
            <StatLabel>
              {caption} as of {date}
            </StatLabel>
            <StatNumber>$ {value} </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </CardBody>
      </Card>
    </Container>
  );
}
