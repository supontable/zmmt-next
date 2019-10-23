import { Container } from "@material-ui/core";
import LoanCard from "../LoanCard";
import LoanHead from "./LoanHead"
import LoanTabs from "./LoanTabs"

export default function LoanCardSingle(props) {
    return (
        <Container>
            <LoanHead {...props} withLogo />
            <LoanCard {...props} withLogo={false}/>
            <LoanTabs />
        </Container>
    )
}
