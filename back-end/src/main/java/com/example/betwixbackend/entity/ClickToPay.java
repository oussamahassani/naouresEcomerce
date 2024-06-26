package com.example.betwixbackend.entity;

import java.util.Date;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ClickToPay")
public class ClickToPay {

    @Id
    private String id;

    private String orderId;
    private String errorMessage;
    private String errorCode;
    private String orderNumber;
    private String approvalCode;
    private String clickToPayOrder;
    private String montantPayement;
    private String idUser;
    
    @CreatedDate
    private Date createdDate;

    private Boolean isPassed;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getApprovalCode() {
        return approvalCode;
    }

    public void setApprovalCode(String approvalCode) {
        this.approvalCode = approvalCode;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Boolean getIsPassed() {
        return isPassed;
    }

    public void setIsPassed(Boolean isPassed) {
        this.isPassed = isPassed;
    }

    public String getClickToPayOrder() {
		return clickToPayOrder;
	}

	public void setClickToPayOrder(String clickToPayOrder) {
		this.clickToPayOrder = clickToPayOrder;
	}

	public String getMontantPayement() {
		return montantPayement;
	}

	public void setMontantPayement(String montantPayement) {
		this.montantPayement = montantPayement;
	}

	public String getIdUser() {
		return idUser;
	}

	public void setIdUser(String idUser) {
		this.idUser = idUser;
	}

	@Override
    public String toString() {
        return "ClicToPay [id=" + id + ", orderId=" + orderId + ", errorMessage=" + errorMessage
                + ", errorCode=" + errorCode + ", orderNumber=" + orderNumber + ", approvalCode="
                + approvalCode + ", createdDate=" + createdDate + ", isPassed=" + isPassed + "]";
    }

}
