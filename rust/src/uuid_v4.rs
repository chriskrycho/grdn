use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
pub(crate) struct UUIDv4(Uuid);

impl UUIDv4 {
    pub(crate) fn new() -> UUIDv4 {
        UUIDv4(Uuid::new_v4())
    }
}

impl ToString for UUIDv4 {
    fn to_string(&self) -> String {
        self.0.to_string()
    }
}
