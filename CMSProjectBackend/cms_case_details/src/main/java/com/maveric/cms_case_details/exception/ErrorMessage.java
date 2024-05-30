package com.maveric.cms_case_details.exception;

class ErrorMessage {
    private String message;

    public ErrorMessage(String message) {
        this.message = message;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
