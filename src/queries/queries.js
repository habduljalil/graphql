import { gql } from "@apollo/client";

export const FETCH_USER_INFO = gql`
  query {
    user {
      id
      login
      email
      attrs
    }
  }
`;

export const FETCH_TRANSACTIONS = gql`
  query {
    transaction(
      where: { type: { _eq: "xp" }, object: { type: { _eq: "project" } } }
      order_by: { createdAt: asc }
    ) {
      amount
      createdAt
      object {
        name
        type
      }
    }
  }
`;

export const GET_PROJECTS_WITH_XP = gql`
  query GetProjectsAndXP($userId: Int!) {
    transaction(
      where: {
        userId: { _eq: $userId },
        type: { _eq: "xp" },
        object: { type: { _eq: "project" } }
      }
        order_by: { createdAt: asc }
    ) {
      id
      object {
        name
      }
      amount
    }
  }
`;

export const FETCH_USER_AUDITS = gql`
  query {
    user {
      validAudits: audits_aggregate(
        where: { grade: { _gte: 1 } }
        order_by: { createdAt: desc }
      ) {
        nodes {
          group {
            captainLogin
            createdAt
          }
        }
      }
 
      
    }
  }
`;

export const FETCH_AUDIT_STATS = gql`
  query {
    user {
      auditRatio
      totalUp
      totalDown
    }
  }
`;

export const FETCH_TECHNICAL_SKILLS = gql`
  query {
    transaction(
      where: {
        _and: [
          { type: { _ilike: "%skill%" } }
        ]
      }
      order_by: [{ type: asc }, { createdAt: desc }]
      distinct_on: type
    ) {
      amount
      type
    }
  }
`;

export const FETCH_USER_LEVEL = gql`
  query {
    transaction(
      order_by: { amount: desc }
      limit: 1
      where: { type: { _eq: "level" }, path: { _like: "/bahrain/bh-module%" } }
    ) {
      amount
    }
  }
`;
