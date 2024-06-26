package com.example.betwixbackend.entity;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.example.betwixbackend.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

@Document(collection = "orders")
public class Order implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

  

    @Field("orderStatus")
    private Integer orderStatus;

    @Field("client")
    private User client;

    @Field("items")
    private Set<OrderItem> items = new HashSet<>();
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    @CreatedDate
    @Field("createdAt")
    private Date createdAt;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    @LastModifiedDate
    @Field("updatedAt")
    private Date updatedAt;
 private String clickToPayOrder;
    
   private String typeDePayement ;
    public Order() {
    }

    public Order(String id, Instant moment, OrderStatus orderStatus, User client) {
        this.id = id;
        setOrderStatus(orderStatus);
        this.client = client;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

  
    public OrderStatus getOrderStatus() {
        return OrderStatus.valueOf(orderStatus);
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        if (orderStatus != null) {
            this.orderStatus = orderStatus.getCode();
        }
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public Set<OrderItem> getItems() {
        return items;
    }

    public void setItems(Set<OrderItem> items) {
		this.items = items;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getTypeDePayement() {
		return typeDePayement;
	}

	public void setTypeDePayement(String typeDePayement) {
		this.typeDePayement = typeDePayement;
	}

	public void setOrderStatus(Integer orderStatus) {
		this.orderStatus = orderStatus;
	}
	
	

	public String getClickToPayOrder() {
		return clickToPayOrder;
	}

	public void setClickToPayOrder(String clickToPayOrder) {
		this.clickToPayOrder = clickToPayOrder;
	}

	@Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Order other = (Order) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

	public void setDateVersement(Date date) {
		// TODO Auto-generated method stub
		
	}

}
