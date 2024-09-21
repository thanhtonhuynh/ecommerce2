import { Container } from "@/components/Container";
import { ProductForm } from "./_components/ProductForm";
import { FormWrap } from "@/components/FormWrap";

export default async function AddProductPage() {
  return (
    <div className="p-2">
      <Container>
        <FormWrap>
          <ProductForm />
        </FormWrap>
      </Container>
    </div>
  );
}
