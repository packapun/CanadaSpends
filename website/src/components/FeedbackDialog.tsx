'use client';
import React, { useState } from "react";
import { Button } from "./button";

export const FeedbackDialog = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("https://api.canadasbuilding.com/-/insert/internal/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: window.location.href,
          comment: feedback,
          email: email || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setSubmitSuccess(true);
      setFeedback("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitError("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
          <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Report an Issue</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium mb-1">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  className="w-full min-h-24 p-2 border rounded-md"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What do you think about this page?"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email (optional)
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              {submitError && (
                <div className="text-red-500 text-sm">{submitError}</div>
              )}
              {submitSuccess && (
                <div className="text-green-500 text-sm">Thank you for your feedback!</div>
              )}
              <Button
                type="submit" 
                disabled={isSubmitting || !feedback.trim()}
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
        </div>
          </form>
        </>
  );
};