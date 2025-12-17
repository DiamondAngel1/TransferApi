import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import {setupStore} from "./app/store.ts";
import {ThemeProvider} from "./admin/context/ThemeContext.tsx";
import {AppWrapper} from "./admin/Components/common/PageMeta.tsx";
import {Provider} from "react-redux";

const queryClient = new QueryClient();
const store = setupStore()

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <AppWrapper>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </QueryClientProvider>
                </Provider>
            </AppWrapper>
        </ThemeProvider>
    </React.StrictMode>
);