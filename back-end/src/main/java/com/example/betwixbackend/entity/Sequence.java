package com.example.betwixbackend.entity;

import java.io.Serializable;

import org.springframework.data.annotation.Id;


public class Sequence implements Serializable  {

        @Id
        private String id;
        private long seqValue;

        public Sequence() {
        }

        public Sequence(String id, long seqValue) {
            this.id = id;
            this.seqValue = seqValue;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public long getSeqValue() {
            return seqValue;
        }

        public void setSeqValue(long seqValue) {
            this.seqValue = seqValue;
        }
    
}
