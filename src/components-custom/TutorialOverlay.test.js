import {render, screen} from "@testing-library/react"
import TutorialOverlay from "./TutorialOverlay";

//Unit test: TutorialOverlay
//Elements: Overlay-text

describe("Unit test TutorialOverlay", () => {
    test("TutorialOverlay should contain all overlay-text elements", async () =>{
        render(<TutorialOverlay/>);
        const overlayElementsOne = screen.getByText(/Step 1/);
        expect(overlayElementsOne).toBeTruthy();
        const overlayElementsTwo = screen.getByText(/Step 2/);
        expect(overlayElementsTwo).toBeTruthy();
        const overlayElementsThree = screen.getByText(/Step 3/);
        expect(overlayElementsThree).toBeTruthy();
        const overlayElementsFour = screen.getByText(/Step 4/);
        expect(overlayElementsFour).toBeTruthy();
        const overlayElementsFive = screen.getByText(/Step 5/);
        expect(overlayElementsFive).toBeTruthy();
    });
})