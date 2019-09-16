import { Container } from "@material-ui/core";
import LoanCard from "../LoanCard";

export default function LoanCardSingle(props) {
    return (
        <Container>
            <LoanCard {...props}/>
        </Container>
    )
}