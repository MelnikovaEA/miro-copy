import { Outlet } from 'react-router-dom';

export const App = () => {
    return (
        <div className="min-h-screen flex flex-col bg-green-100">
            <Outlet />
        </div>
    );
};
