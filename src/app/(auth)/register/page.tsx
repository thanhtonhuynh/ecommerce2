import { Container } from "@/components/Container";
import { FormWrap } from "@/components/FormWrap";
import { RegisterForm } from "./_components/RegisterForm";

export default function RegisterPage() {
  return (
    <Container>
      <FormWrap>
        <RegisterForm />
      </FormWrap>
    </Container>
  );
}
