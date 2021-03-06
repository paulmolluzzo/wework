AutoForm.addHooks(['jobDelete', 'jobNew', 'jobEdit'], {
	after: {
		insert: function(error, result) {
			if (error) {
				console.log("Insert Error:", error);
			} else {
				//console.log("Insert Result:", result);
				GAnalytics.event("expert","insert",getUserName(Meteor.user()));

				Router.go('job', {_id:result});
			}
		},
		update: function(error, result) {
			if (error) {
				console.log("Update Error:", error);
			} else {
				//console.log("Update Result:", result);
				GAnalytics.event("job","update",getUserName(Meteor.user()));

				Router.go('job', {_id: Session.get('editingJobId')});
			}
		},
		remove: function(error, result) {
			if (error) {
				console.log("Remove Error:", error);
			} else {
				//console.log("Insert Result:", result);
				GAnalytics.event("job","remove",getUserName(Meteor.user()));

				Router.go('jobs');
			}
		}
	}
});

Template.jobExpiredAlert.helpers({
	expired: function() {
		if (this.userId === Meteor.userId()) {
			if ((this.createdAt < daysUntilExpiration()) && (this.updatedAt < daysUntilExpiration())) {
				return true;
			} else if ((this.createdAt < daysUntilExpiration()) && (this.updatedAt === undefined)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
});