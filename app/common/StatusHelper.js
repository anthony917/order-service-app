class StatusHelper {
    static availableStatus() {
        return {
            UNASSIGNED: "UNASSIGNED",
            TAKEN: "TAKEN"
        };
    }

    static isAvailable(status) {
        if (status in StatusHelper.availableStatus()) {
            return true;
        }
        return false;
    }
}

module.exports = StatusHelper;