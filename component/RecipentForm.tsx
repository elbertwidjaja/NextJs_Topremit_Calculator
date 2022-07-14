import Header from "./Header";
import Footer from "./Footer";
import { usePage } from "../pages/index";
import RecipientInput from "./RecipientInput";
import { css } from "@emotion/css";
import { Controller, useFormContext } from "react-hook-form";

const styled = {
  root: css`
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .title {
      width: 261px;
      height: 24px;
      left: 24px;
      top: 93px;

      color: "#2E4865";
      font-family: "Mulish", "sans-serif";
      font-style: normal;
      font-weight: 700;
      font-size: 19px;
      line-height: 24px;
      letter-spacing: 0.02rem;
      margin-top: 32px;
      margin-bottom: 30px;
    }
    .handleInput {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  `
};

function RecipentForm() {
  const { nextPage } = usePage();
  const { control, handleSubmit } = useFormContext();

  return (
    <form
      className={styled.root}
      onSubmit={handleSubmit(() => {
        nextPage();
      })}
    >
      <Header />
      <div className="title">Recipents Personal Detail</div>
      <div className="handleInput">
        <Controller
          control={control}
          name="first_name"
          render={({ field }) => (
            <RecipientInput field={field} placeholder="First Name" />
          )}
        />
        <Controller
          control={control}
          name="last_name"
          render={({ field }) => (
            <RecipientInput field={field} placeholder="Last Name" />
          )}
        />
        <Controller
          control={control}
          name="Address"
          render={({ field }) => (
            <RecipientInput field={field} placeholder="Address" />
          )}
        />
      </div>
      <Footer />
    </form>
  );
}

export default RecipentForm;
