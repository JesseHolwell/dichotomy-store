import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  email: string;
  name: string;
};

const BrevoMailList: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "https://api.sendinblue.com/v3/contacts",
        {
          email: data.email,
          attributes: {
            FIRSTNAME: data.name,
          },
          listIds: [3],
          updateEnabled: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.REACT_APP_BREVO_API_KEY,
          },
        }
      );

      console.log("Successfully subscribed:", response.data);
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register("name", { required: true })} />
        {errors.name && <span>Name is required</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Email is required</span>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default BrevoMailList;
