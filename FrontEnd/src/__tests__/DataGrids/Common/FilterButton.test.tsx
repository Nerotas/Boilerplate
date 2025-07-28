import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GridApiPro } from '@mui/x-data-grid-pro';
import ToggleDeprecatedButton from 'components/common/DataGridDefaults/FilterButtons';

describe('ToggleDeprecatedButton', () => {
    let mockApiRef: React.MutableRefObject<GridApiPro>;

    beforeEach(() => {
        mockApiRef = {
            current: {
                deleteFilterItem: jest.fn(),
                upsertFilterItem: jest.fn(),
                setColumnVisibilityModel: jest.fn(),
            },
        } as unknown as React.MutableRefObject<GridApiPro>;
    });

    it('renders the "Show Deprecated" button initially', () => {
        render(<ToggleDeprecatedButton apiRef={mockApiRef} />);
        const button = screen.getByRole('button', { name: /show deprecated/i });
        expect(button).toBeInTheDocument();
    });

    it('calls the correct API methods when "Show Deprecated" is clicked', () => {
        render(<ToggleDeprecatedButton apiRef={mockApiRef} />);
        const button = screen.getByRole('button', { name: /show deprecated/i });

        fireEvent.click(button);

        expect(mockApiRef.current.deleteFilterItem).toHaveBeenCalledWith({
            field: 'deprecatedOnUtc',
            operator: 'isEmpty',
            id: 'deprecated',
        });
        expect(mockApiRef.current.setColumnVisibilityModel).toHaveBeenCalledWith({
            deprecatedOnUtc: true,
            deprecatedByEmail: true,
        });

        // Ensure the button toggles to "Hide Deprecated"
        const hideButton = screen.getByRole('button', { name: /hide deprecated/i });
        expect(hideButton).toBeInTheDocument();
    });

    it('calls the correct API methods when "Hide Deprecated" is clicked', () => {
        render(<ToggleDeprecatedButton apiRef={mockApiRef} />);
        const showButton = screen.getByRole('button', { name: /show deprecated/i });

        // Click "Show Deprecated" to toggle the state
        fireEvent.click(showButton);

        const hideButton = screen.getByRole('button', { name: /hide deprecated/i });
        fireEvent.click(hideButton);

        expect(mockApiRef.current.upsertFilterItem).toHaveBeenCalledWith({
            field: 'deprecatedOnUtc',
            operator: 'isEmpty',
            id: 'deprecated',
        });
        expect(mockApiRef.current.setColumnVisibilityModel).toHaveBeenCalledWith({
            deprecatedOnUtc: false,
            deprecatedByEmail: false,
        });

        // Ensure the button toggles back to "Show Deprecated"
        const showButtonAgain = screen.getByRole('button', { name: /show deprecated/i });
        expect(showButtonAgain).toBeInTheDocument();
    });
});
