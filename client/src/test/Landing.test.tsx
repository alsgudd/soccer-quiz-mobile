/* eslint-disable */

import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import {
  LandingQuizNumbers,
  LandingQuizTeam,
  LandingFooter
} from "components/Organisms";

describe("Landing Page Testing...", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <LandingQuizNumbers />
          <LandingQuizTeam />
          <LandingFooter />
        </RecoilRoot>
      </BrowserRouter>
    )

  })

  test("if selected range is not between 1 and 10 || didn't choose the quiz team, alert message!", () => {
    const quizNumber = screen.getByTestId("quizNumber");
    const quizTeam = screen.getByTestId("quizTeam");    
    const button = screen.getByRole("button");

    expect(quizNumber).toBeInTheDocument();
    expect(quizTeam).toBeInTheDocument();

    window.alert = jest.fn();
    fireEvent.change(quizNumber, { target: { value: 30 } })
    fireEvent.click(button);
    expect(window.alert).toBeCalledWith("Quiz numbers must be between 1 and 10.😁");

    fireEvent.change(quizNumber, { target: { value: 2 } })
    fireEvent.click(button);
    expect(window.alert).toBeCalledWith("Please select the team you want to take the quiz.😁");
  })

  test("Quiz Starting... navigate to /quiz", () => {
    const quizNumber = screen.getByTestId("quizNumber");
    const quizTeam = screen.getByTestId("quizTeam");    
    const button = screen.getByRole("button");

    fireEvent.change(quizNumber, { target: { value: 3 }});
    fireEvent.change(quizTeam, { target: { value: "ManchesterUnited" }});
    fireEvent.click(button);

    expect(window.location.pathname).toBe('/quiz');
  })
})