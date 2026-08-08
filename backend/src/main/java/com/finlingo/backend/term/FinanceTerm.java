package com.finlingo.backend.term;

import jakarta.persistence.*;

@Entity
@Table(name = "finance_terms")
public class FinanceTerm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String term;

    @Column(name = "short_definition")
    private String shortDefinition;

    @Column(name = "long_definition")
    private String longDefinition;

    @Column(name = "difficulty_level")
    private String difficultyLevel = "BEGINNER";

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }
    public String getShortDefinition() { return shortDefinition; }
    public void setShortDefinition(String shortDefinition) { this.shortDefinition = shortDefinition; }
    public String getLongDefinition() { return longDefinition; }
    public void setLongDefinition(String longDefinition) { this.longDefinition = longDefinition; }
    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
}