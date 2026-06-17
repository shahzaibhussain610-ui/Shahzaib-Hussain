import React, { createContext, useState } from "react";
import runChat from "../config/gemini";
import PropTypes from "prop-types";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async () => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPrompts(prev => [...prev, input]); // Save the current prompt to the history

        try {
            const response = await runChat(input);
            setResultData(response);
        } catch (error) {
            console.error("Error fetching chat response:", error);
            setResultData("An error occurred. Please try again.");
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired // Ensure children is provided and of type node
};

export default ContextProvider;
