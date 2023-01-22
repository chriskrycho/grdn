//! Basic definitions of the idea of a "garden" -- like a "feed" but designed
//! from the start to support content which "grows" over time. Think of it as a
//! *complement to* rather than an *alternative to* traditional feed structures
//! like [RSS][rss], [Atom][atom], [JSON Feed][jf], etc.
//!
//! [rss]: TODO
//! [atom]: TODO
//! [jf]: TODO

mod uuid_v4;

use serde::{Deserialize, Serialize};
use uuid_v4::UUIDv4;

#[derive(Serialize, Deserialize, Debug)]
pub struct Garden {
    pub title: String,
    pub link: URL,
    pub items: Vec<Item>,
    pub last_updated: ISO8601Time,
}

/// An item in the garden.
///
/// Nomenclature: In the mental structure of a "garden", an "item" is not
/// necessarily a "plant": it could be a bench someone sits on instead. So this
/// is an "item".
#[derive(Serialize, Deserialize, Debug)]
pub struct Item {
    title: String,
    id: UUIDv4,
    summary: String,
    created: ISO8601Time,
    updates: Vec<Update>,
    link: URL,
}

/// An update to an item in the garden.
#[derive(Serialize, Deserialize, Debug)]
pub struct Update {
    time: ISO8601Time,
    /// What is the basic nature of the change?
    change: Change,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum Change {
    Summary(String),
    Patch(Patch),
    SummaryAndPatch { summary: String, patch: Patch },
}

// This isn't how you'd serialize these; it's a representation of the *transport format*.

// TODO: actually parse from string -> time::whatever
#[derive(Serialize, Deserialize, Debug)]
pub struct ISO8601Time(String);

// TODO: make this parse diffs!
/// Patches in standard `diff` format.
#[derive(Serialize, Deserialize, Debug)]
pub struct Patch(String);

// TODO: actually make this a WHATWG URL. (There's a crate, I am sure.)
#[derive(Serialize, Deserialize, Debug)]
pub struct URL(String);
