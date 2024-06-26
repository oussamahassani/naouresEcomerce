package com.example.betwixbackend.handlers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ErrorDetailNotFoundAPIkonnect {
	        private String code;
	        private String target;
	        private String message;
	        private Object source;

	        public String getCode() {
	            return code;
	        }

	        public void setCode(String code) {
	            this.code = code;
	        }

	        public String getTarget() {
	            return target;
	        }

	        public void setTarget(String target) {
	            this.target = target;
	        }

	        public String getMessage() {
	            return message;
	        }

	        public void setMessage(String message) {
	            this.message = message;
	        }

	        public Object getSource() {
	            return source;
	        }

	        public void setSource(Object source) {
	            this.source = source;
	        }
	    
}
