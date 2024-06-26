package com.example.betwixbackend.handlers;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ErrorResponseKonnectErrorApi {
       // private String message;
        private List<ErrorDetailNotFoundAPIkonnect> errors;

    /*    public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
*/
		public List<ErrorDetailNotFoundAPIkonnect> getErrors() {
			return errors;
		}

		public void setErrors(List<ErrorDetailNotFoundAPIkonnect> errors) {
			this.errors = errors;
		}

		public ErrorResponseKonnectErrorApi() {
			super();
			// TODO Auto-generated constructor stub
		}

		

     
    }

    


