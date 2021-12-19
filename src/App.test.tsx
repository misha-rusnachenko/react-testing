import { render, screen } from '@testing-library/react';
import LoginForm from "./components/LoginForm";
import {Provider} from 'react-redux';
import configureMockStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import Event from "./pages/Event";

const mockStore = configureMockStore();
const store = mockStore({
    event: {
        events: [],
        guests: []
    },
    auth: {}
});

const renderLoginFormComponent = () => {
    return render(
        <Provider store={store}>
            <LoginForm />
        </Provider>
    );
};

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

test('Render login form', () => {
    const { container } = renderLoginFormComponent();

    expect(container).toBeInTheDocument();
})

test('Check login fields status', () => {
    const container = renderLoginFormComponent();

    userEvent.type(container.getByLabelText(/User name/i), "unknown_user")
    userEvent.type(container.getByLabelText(/Password/i), "123")

    userEvent.click(container.getByRole('button'))

    expect(container.getByRole('button')).not.toBeDisabled()
})


const renderEventPage = () => {
    return render(
        <Provider store={store}>
            <Event />
        </Provider>
    );
};


test('Event form dialog', async () => {
    const container = renderEventPage();

    userEvent.click(container.getByRole(/button/i , {
        name: 'Add event'
    }))

    expect(await container.getByRole(/dialog/i)).toBeVisible();

    userEvent.type(container.getByLabelText(/Event description/i), "new event")
    userEvent.type(container.getByLabelText(/Event date/i), "20-01-2022")
    userEvent.type(container.getByLabelText(/Choose guest/i), "user")

    expect(container.getByRole(/button/i, {
        name: 'Create'
    })).not.toBeDisabled()
})