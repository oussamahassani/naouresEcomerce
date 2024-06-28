package com.example.betwixbackend.dto;

public class CountByYearAndMonthDTO {
    private int count;
    private String createdDate;
    private String _id;

    // Constructeur, getters et setters
    public CountByYearAndMonthDTO(String _id ,int count, String createdDate) {
        this.count = count;
        this.createdDate = createdDate;
        this._id =_id;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

}
