package com.wk.demo.utils.exception;

/**
 * Created by cc on 15-12-19.
 */
public class TimeOutException extends SendException {

    public TimeOutException() {
        super();
    }

    public TimeOutException(String message) {
        super(message);
    }

    public TimeOutException(String message, Throwable cause) {
        super(message, cause);
    }

    public TimeOutException(Throwable cause) {
        super(cause);
    }
}
