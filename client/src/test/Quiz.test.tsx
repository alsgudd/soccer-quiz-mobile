/* eslint-disable */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

import { Quiz, QuizFooter } from "components/Organisms";

describe("QuizPage Testing...", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <Quiz />
          <QuizFooter />
        </RecoilRoot>
      </BrowserRouter>
    )
  });
  test("renders quiz with 4 examples", async () => {
    await waitFor(() => {
      const selects = screen.getAllByRole("checkbox");
      expect(selects.length).toBe(4);
    })
  })
})