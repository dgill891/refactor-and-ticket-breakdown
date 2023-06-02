# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
### Ticket 1: Create a Facility Agent mapping table

**Description:**
Create a new table in the database to store the mapping between Facility-specific Agent IDs and internal database Agent IDs. This table will allow Facilities to save their own custom IDs for each Agent they work with.

**Acceptance Criteria:**
- A new table called "FacilityAgentMapping" is created in the database.
- The table has columns for Facility-specific Agent ID and internal database Agent ID.
- The table is properly linked to the Facilities and Agents tables.
- CRUD (Create, Read, Update, Delete) operations can be performed on the FacilityAgentMapping table.
- Proper indexes and constraints are added to ensure data integrity.

**Effort Estimate: 2 hours**

**Implementation Details:**
1. Create a new table called "FacilityAgentMapping" with columns:
    - "facility_agent_id" (Facility-specific Agent ID)
    - "agent_id" (internal database Agent ID)
    - "created_at" (timestamp for record creation)
    - "updated_at" (timestamp for record modification)
2. Establish foreign key constraints between the FacilityAgentMapping table and the Facilities table (facility_id) and Agents table (agent_id).
3. Implement CRUD operations for the FacilityAgentMapping table, including methods to create, read, update, and delete mappings.
4. Add appropriate indexes to ensure efficient querying of the FacilityAgentMapping table.

### Ticket 2: Update report generation with Facility-specific Agent IDs

**Description:**
Modify the report generation process to use Facility-specific Agent IDs instead of internal database Agent IDs when generating reports for Facilities.

**Acceptance Criteria:**
- The function generateReport is updated to use Facility-specific Agent IDs.
- The Facility-specific Agent ID is retrieved from the FacilityAgentMapping table using the internal database Agent ID.
- The Facility-specific Agent ID is included in the generated PDF report for each Agent.

**Effort Estimate: 4 hours**

**Implementation Details:**
1. Retrieve the list of Shifts for the specified quarter using the getShiftsByFacility function.
2. Iterate over the Shifts list and for each Shift:
    - Retrieve the Facility-specific Agent ID from the FacilityAgentMapping table using the internal database Agent ID associated with the Shift.
    - Include the Facility-specific Agent ID in the report generation process.
    - Generate the PDF report with the updated Agent ID included.
3. Test the report generation process to ensure the Facility-specific Agent IDs are correctly displayed in the generated reports.

### Ticket 3: Provide Facility interface to manage Agent IDs

**Description:**
Create a user interface within the Facility platform to allow Facilities to manage the custom IDs for their Agents.

**Acceptance Criteria:**
- A new section is added to the Facility platform for managing Agent IDs.
- Facilities can view, add, update, and delete custom IDs for their Agents.
- The interface provides validation and error handling for input data.
- Changes made in the Facility interface are reflected in the FacilityAgentMapping table.

**Effort Estimate: 8 hours**

**Implementation Details:**
1. Add a new section in the Facility platform for managing Agent IDs, accessible to Facility administrators.
2. Implement a view that displays the list of Agents associated with the Facility, along with their current custom IDs (if available).
3. Provide functionality to add, update, and delete custom IDs for Agents:
    - Add: Allow Facility administrators to add custom IDs for Agents not yet mapped.
    - Update: Allow Facility administrators to update existing custom IDs.
    - Delete: Allow Facility administrators to remove custom IDs.
4. Implement proper validation and error handling for the input data, ensuring the custom IDs meet any required criteria and handling any potential errors gracefully.
5. Update the FacilityAgentMapping table when changes are made in the Facility interface.
6. Test the Facility interface thoroughly to ensure