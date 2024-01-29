import { render, screen } from '@testing-library/react';
import SplineUnderConstruction from './SplineUnderConstruction'; 

// Unit Test: SplineFloorUnderConstruction
// Element: Spline Canvas

describe("Unit Test: SplineUnderConstruction", () => {
    test("Element Spline Canvas should exist", async () => {
        const testData = {
            limit: 100,
            spending: 100
        };
        
        render(<SplineUnderConstruction limit={testData.limit} spending={testData.spending}/>)
        const splineElement = await screen.findByRole("canvas");
        expect(splineElement).toHaveClass('spline-construction');
    })
})
