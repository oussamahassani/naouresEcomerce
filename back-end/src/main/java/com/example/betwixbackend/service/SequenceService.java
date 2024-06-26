package com.example.betwixbackend.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import com.example.betwixbackend.entity.Sequence;
@Service
public class SequenceService {

    @Autowired
    private MongoOperations mongoOperations;

    public long getNextSequence(String sequenceName) {
        Query query = new Query(Criteria.where("_id").is(sequenceName));
        Update update = new Update().inc("seqValue", 1);
        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);
        Sequence sequence = mongoOperations.findAndModify(query, update, options, Sequence.class);
        if (sequence == null) {
            sequence = new Sequence(sequenceName, 1);
        }
        return sequence.getSeqValue();
    }


}
